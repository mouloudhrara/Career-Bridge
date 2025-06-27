const {extractCVData } = require('../services/groqService');

const db = require('../models');
const User=db.User;
const jwt= require('jsonwebtoken');
const crypto= require('crypto');
const nodemailer= require('nodemailer');
const fs= require("fs");
const pdfParse = require('pdf-parse');
const findMatchingJobs = require('../services/jobMatchingService');


require('dotenv').config();

const createToken= (id, role)=>{
    return jwt.sign({id, role},process.env.SECRET,{expiresIn: '2d'});
};
// Signup user
const registerUser= async (req, res)=>{
    const {firstName,
        lastName, 
        email, 
        password, 
        role,
        companyName,
        companyCode
    } = req.body;
    try{
        const user= await User.signup(firstName,
            lastName, 
            email, 
            password, 
            role || 'user',
            companyName,
            companyCode
        );
        const token= createToken(user.id);
        return res.status(201).json({email:user.email, token});
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}
const getCompanyInfo = async (req, res) => {
    try {
        if (req.user.role !== 'job_poster' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const user = await User.findByPk(req.user.id, {
            attributes: ['companyName', 'email']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching company info', error: err.message });
    }
}

// Login user
const loginUser= async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    try{
        const user= await User.login(email, password);
        const token= createToken(user.id, user.role);
        return res.status(201).json({email:user.email, token,id: user.id});
    }catch(err){
        return res.status(400).json({message:err.message});
    }
};

// ForgotPassword
const forgotPassword = async (req, res)=>{
    const {email} = req.body;
    try{
        // check if user exists
    const user = await User.findOne({where: {email}});
    if(!user){
        return res.status(404).json({message: 'User not found with this email'});
    }
    // generate a secure token
    const token= crypto.randomBytes(32).toString('hex');
    const resetTokenExpires= Date.now() +1000 * 60 *15; //token expires in 15min
    // update user with reset token and exp
    user.resetToken=token;
    user.resetTokenExpires=resetTokenExpires;

    await user.save(); //writes the updated fields to the DB

    // Send email with reset link
    const  transporter= nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.EMAIL_USER, //your email
            pass: process.env.EMAIL_PASS,
        },
    });
    //User submits their email on the "Forgot Password" form.
    // checks if the email exists
    // creates a reset token
    // and sends a reset URL like this:
    const resetUrl=`http://localhost:3000/reset-password/${token}`;

    const mailOptions={
        from: process.env.EMAIL_USER,
        to:user.email,
        subject:'Password Reset Request',
        html:`<p>You requested a password reset.</p>
            <p>Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>
            <p>This link will expire in 15 min</p>`,
    };
    // sends an email to user.email
    await transporter.sendMail(mailOptions);
    res.status(200).json({message:'Reset link sent to email'});
    }
    catch(err){
        res.status(500).json({message:'Something went wrong'});
    }
};

// Reset Password
const resetPassword= async (req, res)=>{
    const {token, newPassword} = res.body;

    try{
        // find the user by the reset token
        const user = await User.findOne({where: {resetToken: token}});
        if(!user){
            res.status(400).json({message: 'Invalid or expired reset token'});
        }
        // check if the toke has expired
        if(user.resetTokenExpires < Date.now()){
            return res.status(400).json({message:'Reset token has expired'});
        }

        // hash the new password 
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password and clear reset token
        user.password=hashedPassword;
        user.resetToken= null;
        user.resetTokenExpires=null;

        await user.save();

        res.status(200).json({message: 'Password successfully reset'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: 'Something went wrong'});
    }
};

// upload cv
const uploadCV = async (req, res) => {
    try {
        const userId = req.user.id;
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const user = await User.findByPk(userId);
        
        if (!user) {
            // Clean up the uploaded file if user not found
            fs.unlink(filePath, () => {});
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete old CV file if it exists
        if (user.cvPath && fs.existsSync(user.cvPath)) {
            fs.unlink(user.cvPath, (err) => {
                if (err) console.error('Error deleting old CV:', err);
            });
        }

        // Update user with new CV path
        user.cvPath = filePath;
        await user.save();

        // Process the CV (extract text and find matching jobs)
        fs.readFile(filePath, async (err, data) => {
            if (err) {
                // Clean up if error reading
                fs.unlink(filePath, () => {});
                return res.status(500).json({ message: 'Error reading file' });
            }

            try {
                const pdfData = await pdfParse(data);
                const extractedText = pdfData.text;
                const cvData = await extractCVData(extractedText);
                const matchedJobs = await findMatchingJobs(cvData, userId);

                res.status(200).json({
                    message: user.cvPath ? 'CV updated successfully' : 'CV uploaded successfully',
                    cvData,
                    matchedJobs
                });

            } catch (err) {
                console.error('Failed to process CV:', err);
                // Clean up if processing fails
                fs.unlink(filePath, () => {});
                user.cvPath = null;
                await user.save();
                res.status(500).json({ message: 'Failed to process CV', error: err.message });
            }
        });

    } catch (err) {
        console.error(err);
        if (req.file?.path) {
            // Clean up if any other error occurs
            fs.unlink(req.file.path, () => {});
        }
        res.status(500).json({ message: 'Error processing CV', error: err.message });
    }
};
// delete CV
const deleteCV = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.cvPath) {
            return res.status(400).json({ message: 'No CV to delete' });
        }

        // Delete the file
        if (fs.existsSync(user.cvPath)) {
            fs.unlink(user.cvPath, (err) => {
                if (err) console.error('Error deleting CV file:', err);
            });
        }

        // Update user record
        user.cvPath = null;
        await user.save();

        res.status(200).json({ message: 'CV deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting CV', error: err.message });
    }
};


module.exports={registerUser,
    loginUser, 
    forgotPassword, 
    resetPassword, 
    uploadCV,
    deleteCV,
    getCompanyInfo};
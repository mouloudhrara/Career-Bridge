const express=require('express');
const {registerUser, loginUser, forgotPassword, resetPassword, uploadCV, deleteCV, getCompanyInfo}=require('../controllers/userController');
const { upload } = require('../middlewares/uploads');
const requireAuth = require('../middlewares/requireAuth');
const router=express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/upload-cv',requireAuth, upload.single('cv'), uploadCV); //multer middleware tells multer to expect  a single file upload with the form field name cv
router.delete('/delete-cv',requireAuth, deleteCV);
router.get('/company-info', requireAuth,getCompanyInfo);
module.exports=router;
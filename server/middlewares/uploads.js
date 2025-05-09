const multer = require('multer');
const path=require('path');

// tells multer to store files on disk (on your server’s filesystem).
const storage = multer.diskStorage({
    // where to store the uploaded files.
    // cd callback func
    destination:(req, file, cb)=>{
        cb(null, 'uploads'); // Folder to save
    },
    filename: (req, file, cb)=> {
        const uqSuffix= Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uqSuffix+ path.extname(file.originalname)); //extracts the extension => 1684567890123-234567890.pdf
    }
});

// File filter: only accept PDFs
const fileFilter= (req, file, cb)=>{
    if(file.mimetype=== 'application/pdf'){
        cb(null, true);
    }else{
        cb(new Error('Only pdf files are allowed'), false);
    }
};

// create a multer instance uses (storage: where to save and how to name files) and applies the filter
const upload= multer({storage, fileFilter});

module.exports= {upload};
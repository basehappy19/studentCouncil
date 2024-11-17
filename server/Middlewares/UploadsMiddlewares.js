const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = '';
        if (req.params.type === 'profile') {
            uploadPath = './Uploads/Users/';
        } else if (req.params.type === 'documents'){
            uploadPath = './Uploads/Votes/Documents/';
        } else if (req.params.type === 'work'){
            uploadPath = './Uploads/Works/';
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'File-' + uniqueSuffix + path.extname(file.originalname));
    }
});

exports.upload = (req, res, next) => {
    const fieldName = req.params.fieldName || 'file'; 
    const maxFiles = req.params.maxFiles || 20; 

    const upload = multer({ storage: storage }).array(fieldName, maxFiles);
    
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        next();
    });
};


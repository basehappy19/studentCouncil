const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = "Uploads/"; 
        const type = req.headers['x-upload-type'];
        if (type === "work") {
            uploadPath = "Uploads/Works/Images";
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = crypto.randomBytes(8).toString("hex");
        cb(null, `${fileName}${fileExtension}`);
    }
});

const upload = multer({ storage: storage });

module.exports = { upload };

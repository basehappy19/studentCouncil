const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = "Uploads/";
        const type = req.headers["x-upload-type"];
        const timestamp = new Date();

        const day = String(timestamp.getDate()).padStart(2, "0");
        const month = String(timestamp.getMonth() + 1).padStart(2, "0"); 
        const year = timestamp.getFullYear();

        const readableTimestamp = `${day}-${month}-${year}`; 
        req.uploadTimestamp = readableTimestamp;

        if (type === "work") {
            uploadPath = "Uploads/Works/Images";
        }
        if (type === "report-problem") {
            uploadPath = `Uploads/TraffyFondues/ReportedImages/${readableTimestamp}`;
        }

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = crypto.randomBytes(8).toString("hex");
        cb(null, `${fileName}${fileExtension}`);
    },
});

const upload = multer({ storage: storage });

module.exports = { upload };

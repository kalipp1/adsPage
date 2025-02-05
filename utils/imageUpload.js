const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const [name, ext] = file.originalname.split('.');
        cb(null, `${name}-${Date.now()}.${ext}`);
    },
});

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const imageUpload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE } });

module.exports = imageUpload;
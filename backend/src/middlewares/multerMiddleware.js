const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './public/temp') // doesn't work in vercel because of denied file system access
        cb(null, './tmp')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

module.exports = upload
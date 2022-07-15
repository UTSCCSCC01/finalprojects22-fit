const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const config = require("../config");

const dbUrl = config.dbUrl;

const storage = new GridFsStorage({
    url: dbUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
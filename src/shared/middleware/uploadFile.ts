import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req: Request, _, cb) {
        cb(null, 'tmp/uploads');
    },
    filename: function (_req: Request, file: Express.Multer.File, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const uploadFile = multer({ storage: storage });

export default uploadFile;
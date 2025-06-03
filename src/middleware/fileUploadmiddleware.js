import multer from "multer";
import path from "path"

const assestsPath1 = path.resolve(process.cwd(), "src", "assests", "avatar")
const assestsPath2 = path.resolve(process.cwd(),"src","assests","post")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(req.url);
        if (req.url.includes("details")) cb(null, assestsPath1);
        else if (req.url.includes("add")) cb(null, assestsPath2);
        else cb(null, "uploads/others");

    },

    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname
        cb(null, name);
    }
})

const uploadFile = multer({
    storage: storage,
})

export default uploadFile;
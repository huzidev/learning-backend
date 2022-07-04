import multer from 'multer'; // used for uploading files, doc, images on node js
import path from 'path'; // helpful while uploading

const storage = multer.diskStorage({
    destination : (req, file, cb) => { // file is the path from where img is coming and cb is call back function IMP to use 
        cb(null, 'images') // null means no error in call back function AND we can use ../Images if folder is one level Above
        // or use just Folder Name if they are same siblings like in this case in Images all uploaded images are going to be stored
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // path.extname is EXTENSION NAME
    }
})

const upload = multer({
    storage : storage, // the storage at right is the function we've defined above
    limits : { fileSize : '2000000' }, // the size is in bytes means this means just 2 mb
    fileFilter : (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/ // make sure to write file types INSIDE double /here/
        const mimeType = fileTypes.test(file.mimetype) // it will test the file uploaded and run it with fileTypes which we've already created
        const extname = fileTypes.test(path.extname(file.originalname)) // works same as of mimetype

        if (mimeType && extname) {
            return cb(null, true)
        }
        else{
            cb('use images with proper file format')
        }
    }
}).single('image') 

module.exports = upload;
import multer from 'multer'

export const upload = multer({
    storage,
    limits: { fileSize: 1000000 }
})
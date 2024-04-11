import sharp from 'sharp';

const resize=(req, res, next) => {
    if(!req.file) return next();

    // check if file is an image
    if(!req.file.mimetype.startsWith('image')) return next();

    // check for multiple images
    if(req.files) {
        req.files.forEach(file => {
            sharp(file.buffer)
                .resize(400, 400)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/uploads/${file.filename}`);
        });
    }
}

export default resize;
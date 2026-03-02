const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/process-video', upload.array('images'), async (req, res) => {
    const output = 'output.mp4';

    ffmpeg()
        .input('uploads/%03d.png')
        .inputOptions(['-framerate 1/3'])
        .outputOptions(['-c:v libx264', '-pix_fmt yuv420p'])
        .save(output)
        .on('end', () => {
            res.download(output);
        })
        .on('error', (err) => {
            res.status(500).send(err.message);
        });
});

app.listen(3000, () => console.log('Server running'));
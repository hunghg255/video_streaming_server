const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const request = require('request');
const app = express();
const port = 3000;

const videoPath = path.join(__dirname, 'Chris-Do.mp4');
const hlsFolder = path.join(__dirname, 'hls');
const hlsFolderVideoUrl = path.join(__dirname, 'hls-video-url');


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Ensure HLS folder exists
if (!fs.existsSync(hlsFolder)) {
    fs.mkdirSync(hlsFolder);
}
if (!fs.existsSync(hlsFolderVideoUrl)) {
    fs.mkdirSync(hlsFolderVideoUrl);
}

// Convert MP4 to HLS
// ffmpeg(videoPath, { timeout: 432000 })
//     .addOptions([
//         '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
//         '-level 3.0',
//         '-s 640x360',          // 640px width, 360px height output video dimensions
//         '-start_number 0',     // start the first .ts segment at index 0
//         '-hls_time 10',        // 10 second segment duration
//         '-hls_list_size 0',    // Maximum number of playlist entries (0 means all entries/infinite)
//         '-f hls'               // HLS format
//     ])
//     .output(path.join(hlsFolder, 'index.m3u8'))
//     .on('end', () => {
//         console.log('HLS conversion finished');
//     })
//     .run();


const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const videoStream = request(videoUrl);

// ffmpeg(videoStream)
//     .addOptions([
//         '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
//         '-level 3.0',
//         '-s 640x360',          // 640px width, 360px height output video dimensions
//         '-start_number 0',     // start the first .ts segment at index 0
//         '-hls_time 10',        // 10 second segment duration
//         '-hls_list_size 0',    // Maximum number of playlist entries (0 means all entries/infinite)
//         '-f hls'               // HLS format
//     ])
//     .output(path.join(hlsFolderVideoUrl, 'index.m3u8'))
//     .on('end', () => {
//         console.log('HLS conversion finished');
//     })
//     .on('error', (err) => {
//         console.error('Error during HLS conversion:', err);
//     })
//     .run();

// Serve HLS files
app.use('/hls', express.static(hlsFolder));

app.use('/video', express.static(hlsFolderVideoUrl));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

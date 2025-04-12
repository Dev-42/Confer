const ffmpegPath = require("ffmpeg-static");
const { execFile } = require("child_process");
const path = require("path");

// Change these paths as needed
const inputFile = path.join(__dirname, "public", "ConferfinalVideo.mp4");
const outputFile = path.join(__dirname, "public", "ConferfinalVideo.webm");

execFile(
  ffmpegPath,
  [
    "-i",
    inputFile,
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    "32",
    "-an",
    outputFile,
  ],
  (err, stdout, stderr) => {
    if (err) {
      console.error("FFmpeg error:", err);
      return;
    }
    console.log("✅ Video converted to WebM!");
  }
);

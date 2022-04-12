import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
};

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
};

const handleDownload = async () => {

    // if Clicked Download remove Action on Button
    startBtn.removeEventListener("click", handleDownload);
    startBtn.innerText = "Now Transcoding...";
    startBtn.disabled = true;

    // Load ffmpeg From FFmpeg
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    // Create file on ffmpeg
    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

    // Run ffmpeg by Command - run input recording.webm compile as 60 frame make output.mp4
    await ffmpeg.run("-i", files.input, "-r", "60", files.output);

    // Take 1 Screen shot on 3seconds of video and save as thumbnail.jpg
    await ffmpeg.run("-i", files.input, "-ss", "00:00:03", "-frames:v", "1", files.thumb);

    // Get mp4 file From FFmpeg File System
    const mp4File = ffmpeg.FS("readFile", files.output);
    const thumbFile = ffmpeg.FS("readFile", files.thumb);

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url, "My recording.mp4");
    downloadFile(thumbUrl, "Thumbnail.jpg");
 
    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

    // After Transcoding 
    startBtn.disabled = false;
    startBtn.innerText = "Record Again";
    startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
    startBtn.innerText = "Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    
    // Start Recording
    recorder = new window.MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        // console.log(event.data);
        videoFile = URL.createObjectURL(event.data);
        preview.srcObject = null;
        preview.src = videoFile;
        preview.loop = true;
        preview.play();
    }
    recorder.start();
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);

    recorder.stop();
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 1024, height: 576 },
    });
    //console.log(stream);
    preview.srcObject = stream;
    preview.play();
};

init();

startBtn.addEventListener("click", handleStart);

const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "My recording.webm";
    document.body.appendChild(a);
    a.click();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
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
        audio: true,
        video: { width: 600, height: 400 },
    });
    //console.log(stream);
    preview.srcObject = stream;
    preview.play();
};

init();

startBtn.addEventListener("click", handleStart);

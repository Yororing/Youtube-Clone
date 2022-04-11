const video = document.querySelector("video");
const play = document.getElementById("play");
const playIcon = play.querySelector("i");
const mute = document.getElementById("mute");
const muteIcon = mute.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeRange = document.getElementById("timeRange");
const fullScreen = document.getElementById("fullScreen");
const fullScreenIcon = fullScreen.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;
let controlsTimeout = null;
let controlsMovementTimeout = null;

// Handler
const handlePlayClick = (event) => {
    // if video paused
    if(video.paused) {
        video.play();
    } 
    // if video is playing
    else {
        video.pause();
    }
    playIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

// const handlePlayerKeydown = (event) => {
//    if(event.keyCode === 32) {
//        // if video paused
//        if(video.paused) {
//            video.play();
//        } 
//        // if video is playing
//        else {
//            video.pause();
//        }
//        playIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
//    }
// };

const handleMuteClick = (e) => {
    if(video.muted) {
        video.muted = false;  
    }
    else {
        video.muted = true;
    }
    muteIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
    const { target: {value} } = event;
    if(video.muted) {
        video.muted = false;
        mute.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
};

const handlePause = () => {
    play.innerText = "Play";
};

const handlePlay = () => {
    play.innerText = "Pause";
};

const formatTime = (seconds) => {
    // Over 1hours
    if(seconds >= 3600) {
        return new Date(seconds * 1000).toISOString().substring(11, 19);
    }
    else {
        return new Date(seconds * 1000).toISOString().substring(14, 19);
    }
};

const handleLoadedMetadata = () => {
    timeRange.max = Math.floor(video.duration);
    totalTime.innerText = formatTime(Math.floor(video.duration));    
};

const handelTimeUpdate = () => {
    timeRange.value = Math.floor(video.currentTime);
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
};

const handleTimeLineChange = (event) => {
    const { target: {value} } = event;
    video.currentTime = value;
};

const handleFullscreen = () => {
    if(document.fullscreenElement) {
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    }
    else {
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if(controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: "POST",
    });
};

play.addEventListener("click", handlePlayClick);
mute.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);

video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handelTimeUpdate);
video.addEventListener("ended", handleEnded);

video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);

// videoContainer.addEventListener("keydown", handlePlayerKeydown);
fullScreen.addEventListener("click", handleFullscreen);
timeRange.addEventListener("input", handleTimeLineChange);
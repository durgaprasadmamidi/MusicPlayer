const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const cover = document.getElementById('cover');
const title = document.getElementById('title');




// Song titles
const songs = ['hey','summer','ukulele'];

let songIndex = 2;
    
//initially load song
loadSong(songs[songIndex]);

// Load song
function loadSong(song){
    cover.src = `images/${song}.jpg`
    title.innerText = song;
    audio.src = `music/${song}.mp3`
     
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

playBtn.addEventListener('click', (e)=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying)
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying)
    playSong();
}

function updateProgress(e){
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100; 
    progress.style.width = `${progressPercent}%`;
    if(progressPercent === 100){
        pauseSong();
    }
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width)*duration;
}


function init(){

    prevBtn.addEventListener('click',prevSong);
    nextBtn.addEventListener('click',nextSong);
    
    
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);

}


document.addEventListener('DOMContentLoaded',init);
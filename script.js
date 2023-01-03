console.log("Welcome to Spotify!!");

//initialize the variables
let port = 8080;
let songIndex =0;
let audioEle =  new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersong = document.getElementById('mastersong');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Perfect - Ed Sheeran", filePath: "1.mp3", coverPath:"cover1.jpg" },
    {songName: "Until I found You", filePath: "2.mp3", coverPath:"cover2.jpg" },
    {songName: "At my Worst", filePath: "3.mp3", coverPath:"cover3.jpg" },
    {songName: "This Town", filePath: "4.mp3", coverPath:"cover4.jpg" },
    {songName: "As it was", filePath: "5.mp3", coverPath:"cover5.jpg" },
    {songName: "Tu/You", filePath: "6.mp3", coverPath:"cover6.jpg" },
    {songName: "Mast Magan", filePath: "7.mp3", coverPath:"cover7.jpg" },
]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// handle play-pause-click
masterPlay.addEventListener('click' , ()=> {
    if(audioEle.paused || audioEle.currentTime <=0){
        audioEle.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioEle.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }

})
//listen to events
audioEle.addEventListener('timeupdate', ()=> {
    progress = parseInt((audioEle.currentTime/audioEle.duration)*100);
    //update progressbar
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=> {
    audioEle.currentTime = ((progressBar.value * audioEle.duration)/100)
})

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click' , (e)=> {
            if(audioEle.paused || audioEle.currentTime <=0){
                songIndex = parseInt(e.target.id);
                audioEle.src = `${songIndex}.mp3`;
                audioEle.currentTime = 0;
                mastersong.innerText = songs[songIndex-1].songName;
                audioEle.play();
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
                masterPlay.classList.remove("fa-play-circle");
                masterPlay.classList.add("fa-pause-circle");
            }
            else{
                audioEle.pause();
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
                masterPlay.classList.add("fa-play-circle");
                masterPlay.classList.remove("fa-pause-circle");
                gif.style.opacity = 0;
            }
        })
    })

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 7){
        songIndex = 1;
    }
    else{
    songIndex++;
    }
    audioEle.src = `${songIndex}.mp3`;
    audioEle.currentTime = 0;
    mastersong.innerText = songs[songIndex-1].songName;
    audioEle.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 7;
    }
    else{
    songIndex--;
    }
    audioEle.src = `${songIndex}.mp3`;
    audioEle.currentTime = 0;
    mastersong.innerText = songs[songIndex-1].songName;
    audioEle.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})
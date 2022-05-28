setInterval(blowalarm, 10000);

async function blowalarm(){  
    k = new Date().toLocaleString();
    k = k.substring(0, k.length - 6)+ k.substring(k.length - 3, k.length);
    let times = JSON.parse(localStorage.getItem("times"));
    if (times.indexOf(k) > -1) {
        var audio = new Audio('https://www.fesliyanstudios.com/play-mp3/4384');
        audio.play();
    }
}
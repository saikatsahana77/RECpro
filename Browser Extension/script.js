setInterval(fetchdata, 1000);
// setInterval(blowalarm, 10000);

function fetchdata(){
    d3.json("data.json").then(function(data_json) {
        let comp = data_json.companies
        let time = data_json.times
        document.getElementById("content").innerHTML = "";
        for (let i = 0; i < comp.length; i++) {
            time[i] = time[i].substring(0, time[i].length - 6)+ time[i].substring(time[i].length - 3, time[i].length);
            document.getElementById("content").innerHTML += `<tr><td>${comp[i]}</td><td>${time[i]}</td></tr>`;
        }
        localStorage.setItem("companies",JSON.stringify(comp));
        localStorage.setItem("times",JSON.stringify(time));
    })
}

// async function blowalarm(){
//     k = new Date().toLocaleString()
//     k = k.substring(0, k.length - 6)+ k.substring(k.length - 3, k.length);
//     let times = JSON.parse(sessionStorage.getItem("times"));
//     if (times.indexOf(k) > -1) {
//         var audio = new Audio('https://www.fesliyanstudios.com/play-mp3/4384');
//         audio.play();
//     }
// }
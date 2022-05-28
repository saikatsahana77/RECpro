for (var i = 0; i < scores.length; i++){
    document.getElementById("attempts").innerHTML += `<tr><td>${i+1}</td><td>${scores[i]}</td></tr>`;
}
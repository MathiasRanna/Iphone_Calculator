// Time in Iphone calc

const interval = setInterval(() => {
    let timeObj = new Date();
    if (timeObj.getMinutes() < 10){
        document.getElementById("time-spot").innerHTML = timeObj.getHours() + ":0" + timeObj.getMinutes();
    } else {
        document.getElementById("time-spot").innerHTML = timeObj.getHours() + ":" + timeObj.getMinutes();
    }
}, 60)
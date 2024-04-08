const start = document.getElementById("start-btn");
const reset = document.getElementById("reset-btn");
const timer = document.getElementById("timer");
const lap = document.getElementById("lap-btn");


let interval;
let hr = 0;
let min= 0;
let sec= 0;
let millisec=0;
start.addEventListener("click", ()=>{
    interval = setInterval(startTimer, 10);
})

reset.addEventListener("click", ()=>{
    clearInterval(interval);
    sec=0;
    min=0;
    hr=0;
    millisec=0;
    timer.innerText = "00:00:00:00";
})
let totalLapTime = 0;
lap.addEventListener("click", ()=>{
    const lapTime = timer.innerText;
    totalLapTime
    console.log(lapTime)
    console.log(totalLapTime)
})

const startTimer = () =>{
    millisec++;
    timer.innerText = `0${hr}:0${min}:0${sec}:${millisec}`;
    // if(millisec>9){
    //     timer.innerText = `0${hr}:0${min}:0${sec}:${millisec}`;
    // }
    if(sec>9){
        timer.innerText = `0${hr}:0${min}:${sec}:${millisec}`;
    }
    // if(min>9){
    //     timer.innerText = `0${hr}:${min}:0${sec}:0${millisec}`;
    // }
    if(millisec>=99){
        sec++;
        millisec=0;
    }
    if(sec>=59){
        min++;
        sec=0;
        millisec=0;
    }
}
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const timer = document.getElementById("timer");
const lapBtn = document.getElementById("lap-btn");
const stopBtn = document.getElementById("stop-btn");
const lapContainer = document.getElementById("lap-container");

let timeInterval;
let startTime;
let elapsedTime = 0;
let lapCnt=0;
let lapStartTime=0;

startBtn.addEventListener("click", () => {
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(startTimer, 10);
    stopBtn.style.display = "block"
    resetBtn.style.display = "block";
    lapBtn.style.display = "block";
    startBtn.style.display = "none";
    lapStartTime = startTime;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    startTime=0;
    elapsedTime=0;
    timer.innerText = "00:00:00:00:00"
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "none";
    startBtn.style.display = "block";
    lapContainer.innerText ="";
    lapContainerHeading.style.display = "none";
    lapCnt=0;
})  

function startTimer() {
    elapsedTime = Date.now() - startTime;
    timer.innerText = toTimeFormate(elapsedTime);
}

stopBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    resetBtn.style.display = "block";
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
})  

const toTimeFormate = (elapsedTime) => {
    const date = new Date(elapsedTime);
    let day = date.getDate()-1;
    let hr = date.getUTCHours();
    let min = date.getUTCMonth();
    let sec = date.getUTCSeconds();
    let millisec = Math.floor(date.getMilliseconds() / 10);

    let exactDay = day.toString().padStart(2, "0");
    let exactHour = hr.toString().padStart(2, "0");
    let exactMin = min.toString().padStart(2, "0");
    let exactSec = sec.toString().padStart(2, "0");
    let exactmilli = millisec.toString().padStart(2, "0");

    return `${exactDay}:${exactHour}:${exactMin}:${exactSec}:${exactmilli}`;
};

lapBtn.addEventListener('click', ()=>{
    let lapTime = getLapTime();
    if(lapCnt===0){
        lapContainerHeading = document.createElement("div")
        const head1 = document.createElement("p")
        const head2 = document.createElement("p")
        const head3 = document.createElement("p")
        head1.innerText = "lap no."
        head2.innerText = "lap time"
        head3.innerText = "total time"
        lapContainerHeading.appendChild(head1)
        lapContainerHeading.appendChild(head2)
        lapContainerHeading.appendChild(head3)

        lapContainerHeading.classList.add("lap-container-heading")
        lapContainerHeading.style.display = "flex"
        lapContainer.appendChild(lapContainerHeading)

    }

    lapCnt++;
    let lapDiv = document.createElement("div")
    lapDiv.classList.add("lap-div")

    let lapNum = document.createElement("p")
    lapNum.innerText = `lap${lapCnt}`;
    lapDiv.append(lapNum)

    let singleLapTime = document.createElement("p")
    singleLapTime.innerText = lapTime
    lapDiv.append(singleLapTime)

    let totalLapTime = document.createElement("p")
    totalLapTime.innerText = timer.innerText
    lapDiv.append(totalLapTime)

    lapContainer.appendChild(lapDiv)
})

//to get the lap time
const getLapTime = () => {
    const elapsedLapTime = Date.now() - lapStartTime;
    const lapTime = toTimeFormate(elapsedLapTime);
    lapStartTime = Date.now();
    return lapTime;
};

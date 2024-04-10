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

function startTimer() {
    elapsedTime = Date.now() - startTime;
    timer.innerText = toTimeFormate(elapsedTime);
}

resetBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    startTime=0;
    elapsedTime=0;
    timer.innerText = "00:00:00:00:00:00:00"
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "none";
    startBtn.style.display = "block";
    lapContainer.innerText ="";
    lapContainerHeading.style.display = "none";
    lapCnt=0;
})  

stopBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    resetBtn.style.display = "block";
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
})  

const toTimeFormate = (elapsedTime) => {

    let totalYears = elapsedTime / 31104000000;
    let year = Math.floor(totalYears);
    let totalMonths = (totalYears - year) * 12;
    let month = Math.floor(totalMonths % 12);
    let totalDays = (totalMonths - month) * 30;
    let day = Math.floor(totalDays % 30);
    let totalHours = (totalDays - day) * 24;
    let hour = Math.floor(totalHours % 24);
    let totalMins = (totalHours - hour) * 60;
    let minute = Math.floor(totalMins % 60);
    let totalSec = (totalMins - minute) * 60;
    let second = Math.floor(totalSec % 60);
    let totalMilliiSeconds = (totalSec - second) * 100;
    let millisecond = Math.floor(totalMilliiSeconds % 1000);

    let exactYear = year.toString().padStart(2, "0");
    let exactMonth = month.toString().padStart(2, "0");
    let exactDay = day.toString().padStart(2, "0");
    let exactHour = hour.toString().padStart(2, "0");
    let exactMin = minute.toString().padStart(2, "0");
    let exactSec = second.toString().padStart(2, "0");
    let exactmilli = millisecond.toString().padStart(2, "0");

    let yearString = year > 1 ? "years": "year";
    let monthString = month > 1 ? "months": "month";
    let dayString = day > 1 ? "days": "day";
    let hourString = hour > 1 ? "hours": "hour";
    let minuteString = minute > 1 ? "minutes": "minute";
    let secondString = second > 1 ? "seconds": "second";
    let millisecondString = millisecond > 1 ? "milliseconds": "millisecond";

    return `${exactYear}${yearString} ${exactMonth}${monthString} ${exactDay}${dayString} ${exactHour}${hourString} ${exactMin}${minuteString} ${exactSec}${secondString} ${exactmilli}${millisecondString} `;
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

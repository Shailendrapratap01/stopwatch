const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const timer = document.getElementById("timer");
const lapBtn = document.getElementById("lap-btn");
const stopBtn = document.getElementById("stop-btn");
const lapContainer = document.getElementById("lap-container");
const yearDisplay = document.getElementById("year");
const monthDisplay = document.getElementById("month");
const dayDisplay = document.getElementById("day");
const hourDisplay = document.getElementById("hour");
const minuteDisplay = document.getElementById("minute");
const secondDisplay = document.getElementById("second");
const millisecondDisplay = document.getElementById("millisecond");

let timeInterval;
let startTime;
let elapsedTime = 0;
let lapCnt=0;
let lapStartTime=0;
let year=0 ;
let month=0;
let day =0;
let hour=0;
let minute=0; 
let second=0; 
let millisecond=0;

startBtn.addEventListener("click", () => {
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(startTimer, 10);
    stopBtn.style.display = "block"
    resetBtn.style.display = "block";
    lapBtn.style.display = "block";
    startBtn.style.display = "none";
    lapStartTime = startTime;
    console.log("hi")
});

function startTimer() {
    elapsedTime = Date.now() - startTime;
    let ansArray = toTimeFormate(elapsedTime);
    millisecondDisplay.innerText = ansArray[6];
    secondDisplay.innerText = ansArray[5];
    minuteDisplay.innerText = ansArray[4];
    hourDisplay.innerText = ansArray[3];
    dayDisplay.innerText = ansArray[2];
    monthDisplay.innerText = ansArray[1];
    yearDisplay.innerText = ansArray[0];
}

resetBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    startTime=0;
    elapsedTime=0;
    lapCnt=0;
    millisecondDisplay.innerText = "00";
    secondDisplay.innerText = "00";
    minuteDisplay.innerText ="00";
    hourDisplay.innerText ="00";
    dayDisplay.innerText = "00";
    monthDisplay.innerText = "00";
    yearDisplay.innerText = "00";
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "none";
    startBtn.style.display = "block";
    lapContainer.innerText ="";
    lapContainerHeading.style.display = "none";
})  

stopBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    resetBtn.style.display = "block";
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
})  

const toTimeFormate = (elapsedTime) => {

    let totalMilliiSeconds = elapsedTime;
    millisecond = Math.floor(totalMilliiSeconds % 1000);
    let totalSec = totalMilliiSeconds / 1000;
    second = Math.floor(totalSec % 60);
    if (totalSec == 60)
    {
        let totalMins = totalSec / 60;
        minute = Math.floor(totalMins % 60);
        if(totalMins > 59)    
        {
            let totalHours = totalMins / 60;
            hour = Math.floor(totalHours % 60);
            if(totalHours > 23)
            {
                let totalDays = totalHours / 24;
                day = Math.floor(totalDays % 60);
                if(totalDays > 29)
                {   
                    let totalMonths = totalDays / 30;
                    month = Math.floor(totalMonths % 12);
                    if(totalMonths > 11)
                    {
                        let totalyears = totalMonths / 12;
                        year = Math.floor(totalyears);
                    }
                }
            }
        }
    }

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

    return [`${exactYear}${yearString}`, `${exactMonth}${monthString}`, `${exactDay}${dayString}`, `${exactHour}${hourString}`, `${exactMin}${minuteString}`, `${exactSec}${secondString}`, `${exactmilli}${millisecondString}`];
};

lapBtn.addEventListener('click', ()=>{
    let { lapTime, totalTime } = getLapTime();
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
    totalLapTime.innerText = totalTime
    lapDiv.append(totalLapTime)

    lapContainer.appendChild(lapDiv)
})

//to get the lap time
let totalLapElapsedTime = 0;
const getLapTime = () => {
    const elapsedLapTime = Date.now() - lapStartTime;
    const lapTime = toTimeFormate(elapsedLapTime).join(":");
    lapStartTime = Date.now();
    totalLapElapsedTime += elapsedLapTime;
    const totalTime = toTimeFormate(totalLapElapsedTime).join(":");
    return { lapTime, totalTime };
};

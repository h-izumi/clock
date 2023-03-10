"use strict";

const clockHM = document.getElementById("clockHM");
const clockSec = document.getElementById("clockSec");

const configurationBox = document.getElementById("configurationBox");

function updateClock(){
    const now = new Date();

    clockHM.innerText =
        `${now.getHours().toString().padStart(2, "0")}:` +
        `${now.getMinutes().toString().padStart(2, "0")}`;
    clockSec.innerText =
        now.getSeconds().toString().padStart(2, "0");

    const b = 500 - now.getMilliseconds();
    if (b > 0) {
        setTimeout(() => {
            clockHM.innerText =
                `${now.getHours().toString().padStart(2, "0")} ` +
                `${now.getMinutes().toString().padStart(2, "0")}`;
        }, b);
    }
    setTimeout(() => {
        updateClock();
    }, 1000 - now.getMilliseconds());
}

function clickBtnConfiguration(e) {
    e.preventDefault();
    if (configurationBox.classList.contains("active")) {
        configurationBox.classList.remove("active");
    } else {
        configurationBox.classList.add("active");
    }
}

document.getElementById("btnConfiguration").onclick = clickBtnConfiguration;

updateClock();
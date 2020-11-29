const intervalParam = "i";
const warmUpParam = "w";
const onParam = "on";
const offParam = "off";
const coolDownParam = "c";


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

class Timer {
    constructor(
        intervalNumberElementId,
        warmUpElementId,
        timeOnElementId,
        timeOffElementId,
        coolDownElementId,
        currActionNameElementId,
        currActionTimeElementId,
        nextActionNameElementId
    ) {
        this.intervalNumber = document.getElementById(
            intervalNumberElementId
        ).value;
        this.warmUp = document.getElementById(warmUpElementId).value;
        this.timeOn = document.getElementById(timeOnElementId).value;
        this.timeOff = document.getElementById(timeOffElementId).value;
        this.coolDown = document.getElementById(coolDownElementId).value;

        this.currActionNameElement = document.getElementById(
            currActionNameElementId
        );
        this.currActionTimeElement = document.getElementById(
            currActionTimeElementId
        );
        this.nextActionNameElement = document.getElementById(
            nextActionNameElementId
        );

        this.actions = {};
        if (this.warmUp) {
            this.actions["warm-up"] = { name: "Warm Up", time: this.warmUp };
        }
        for (let i = 0; i < this.intervalNumber; i++) {
            this.actions[`exercise-${i}`] = {
                name: `Exercise`,
                time: this.timeOn,
            };
            this.actions[`break-${i}`] = { name: "Break", time: this.timeOff };
        }
        if (this.coolDown) {
            this.actions["cool-down"] = {
                name: "Cool Down",
                time: this.coolDown,
            };
        }
        this.actions["done"] = { name: "Complete", time: 0 };
    }

    async start() {
        console.log(this.actions);
        for (const action in this.actions) {
            let actionName = this.actions[action]["name"];
            let actionTime = this.actions[action]["time"];

            var actionType = new RegExp("(\\w+)");
            var actionPart = actionType.exec(action)[0];
            if (actionPart) {
                actionPart = actionPart.trim().toLowerCase();
            }

            switch (actionPart) {
                case "warm":
                case "cool":
                    this.currActionTimeElement.style.color = "orange";
                    break;
                case "exercise":
                    this.currActionTimeElement.style.color = "green";
                    break;
                case "break":
                    this.currActionTimeElement.style.color = "red";
                    break;
                default:
                    this.currActionTimeElement.style.color = "white";
                    break;
            }

            this.currActionNameElement.textContent = `${actionName}`;
            if (actionPart != "done") {
                this.currActionTimeElement.textContent = `${actionTime}`;
                await sleep(1000);
                for (let s = --actionTime; s > 0; s--) {
                    this.currActionTimeElement.textContent = `${s}`;
                    await sleep(1000);
                }
            } else {
                this.currActionTimeElement.textContent = "";
            }
        }
    }
}

function beginTimer() {
    const newTimer = new Timer(
        "interval-num",
        "warm-up",
        "on",
        "off",
        "cool-down",
        "current-action-name",
        "current-action-time",
        "next-action-name"
    );
    newTimer.start();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const intervalNum = urlParams.get(intervalParam);
const warmUp = urlParams.get(warmUpParam);
const onTime = urlParams.get(onParam);
const offTime = urlParams.get(offParam);
const coolDown = urlParams.get(coolDownParam);

if (intervalNum) {
    document.getElementById("interval-num").value = intervalNum;
}

if (warmUp) {
    document.getElementById("warm-up").value = warmUp;
}

if (onTime) {
    document.getElementById("on").value = onTime;
}

if (offTime) {
    document.getElementById("off").value = offTime;
}

if (coolDown) {
    document.getElementById("cool-down").value = coolDown;
}

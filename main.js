const DEBUG = false;
let timespeed = 1;
let tx = 0;
let ty = 0;
let scaleVal = 1;
const houses = [];
const skulls = [];
let skull;
let time = 7 * 60 * 60 * 1000;
let selectTick = 0;
const timer = document.getElementById("timer");
const office = Office({
    x: 1000,
    y: -700,
    color: "magenta"
});
const groceryStores = [GroceryStore({
    x: -100,
    y: -300,
    color: "yellow"
}), GroceryStore({
    x: 2100,
    y: -300,
    color: "yellow"
})]
const smallBusinesses = [SmallBusiness({
    x: 400,
    y: -100,
    color: "purple"
}), SmallBusiness({
    x: 800,
    y: -100,
    color: "purple"
}), SmallBusiness({
    x: 1200,
    y: -100,
    color: "purple"
}), SmallBusiness({
    x: 1600,
    y: -100,
    color: "purple"
})]
const apartmentBuildings = [
    ApartmentBuilding({
        x: 2300,
        y: 500,
        color: "red"
    }), ApartmentBuilding({
        x: 2300,
        y: 1500,
        color: "blue"
    })
];
const schools = [
    School({
        x: 500,
        y: 2250,
        color: "#00FF00",
        role: "Elementary School"
    }),
    School({
        x: 1000,
        y: 2250,
        color: "#00FF00",
        role: "Middle School"
    }),
    School({
        x: 1500,
        y: 2250,
        color: "#00FF00",
        role: "High School"
    })
];
const hospital = Hospital({
    x: -400,
    y: 1000
})
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
        houses.push(House({
            x: 100 + i * 200,
            y: 100 + 200 * j,
            color: "red"
        }))
    }
}
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
        houses.push(House({
            x: 100 + i * 200,
            y: 100 + 200 * j + 1000,
            color: "blue"
        }))
    }
}
const roads = [];
roads.push(Road({
    start: hospital,
    end: {
        x: 200,
        y: 1000
    }
}), Road({
    start: {
        x: 200,
        y: 900
    },
    end: {
        x: 200,
        y: 1000
    }
}), Road({
    start: {
        x: 200,
        y: 1000
    },
    end: {
        x: 200,
        y: 1100
    }
}), Road({
    start: {
        x: 100,
        y: 100
    },
    end: {
        x: -100,
        y: 100
    }
}), Road({
    start: {
        x: -100,
        y: 100
    },
    end: {
        x: -100,
        y: -300
    }
}), Road({
    start: {
        x: 2000,
        y: 100
    },
    end: {
        x: 2100,
        y: 100
    }
}), Road({
    start: {
        x: 2100,
        y: 100
    },
    end: {
        x: 2100,
        y: -300
    }
}), Road({
    start: { x: 1000, y: 100 },
    end: { x: 1000, y: -700 }
}), Road({
    start: {
        x: 400,
        y: -100
    },
    end: {
        x: 400,
        y: 100
    }
}), Road({
    start: {
        x: 800,
        y: -100
    },
    end: {
        x: 800,
        y: 100
    }
}), Road({
    start: {
        x: 1200,
        y: -100
    },
    end: {
        x: 1200,
        y: 100
    }
}), Road({
    start: {
        x: 1600,
        y: -100
    },
    end: {
        x: 1600,
        y: 100
    }
}), Road({
    start: {
        x: 1000,
        y: 1900
    },
    end: {
        x: 1000,
        y: 2250
    }
}), Road({
    start: {
        x: 2000 * 0.25,
        y: 1900
    },
    end: {
        x: 2000 * 0.25,
        y: 2250
    }
}), Road({
    start: {
        x: 2000 * 0.75,
        y: 1900
    },
    end: {
        x: 2000 * 0.75,
        y: 2250
    }
}), Road({
    start: {
        x: 2300,
        y: 300
    },
    end: {
        x: 2000,
        y: 300
    }
}), Road({
    start: {
        x: 2300,
        y: 500
    },
    end: {
        x: 2000,
        y: 500
    }
}), Road({
    start: {
        x: 2300,
        y: 700
    },
    end: {
        x: 2000,
        y: 700
    }
}), Road({
    start: {
        x: 2300,
        y: 1300
    },
    end: {
        x: 2000,
        y: 1300
    }
}), Road({
    start: {
        x: 2300,
        y: 1500
    },
    end: {
        x: 2000,
        y: 1500
    }
}), Road({
    start: {
        x: 2300,
        y: 1700
    },
    end: {
        x: 2000,
        y: 1700
    }
}), Road({
    start: {
        x: 2300,
        y: 300
    },
    end: {
        x: 2300,
        y: 500
    }
}), Road({
    start: {
        x: 2300,
        y: 500
    },
    end: {
        x: 2300,
        y: 700
    }
}), Road({
    start: {
        x: 2300,
        y: 1300
    },
    end: {
        x: 2300,
        y: 1500
    }
}), Road({
    start: {
        x: 2300,
        y: 1500
    },
    end: {
        x: 2300,
        y: 1700
    }
}))
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 9; j++) {
        roads.push(Road({
            start: {
                x: 200 + i * 200,
                y: 100 + 200 * j
            },
            end: {
                x: 200 + i * 200,
                y: 100 + 200 * j + 200
            }
        }))
    }
}
houses.forEach(house => {
    if (house.x !== 100) {
        roads.push(Road({
            start: house,
            end: {
                x: house.x - 100,
                y: house.y
            }
        }))
    }
    roads.push(Road({
        start: house,
        end: {
            x: house.x + 100,
            y: house.y
        }
    }))
})
const people = [];
for (let i = 0; i < 100; i++) {
    const lastName = faker.name.lastName();
    houses[i].name = lastName;
    houses[i].residents = [];
    for (let j = 0; j < 2; j++) {
        const peep = Person({
            x: houses[i].x + getRndInteger(-15, 15),
            y: houses[i].y + getRndInteger(-15, 15),
            home: houses[i],
            child: false,
            groceryProvider: j === 0 ? true : false,
            lastName
        });
        people.push(peep);
        houses[i].residents.push(peep);
    }
    for (let j = 0; j < 2; j++) {
        const peep = Person({
            x: houses[i].x + getRndInteger(-15, 15),
            y: houses[i].y + getRndInteger(-15, 15),
            home: houses[i],
            child: true,
            lastName
        })
        people.push(peep);
        houses[i].residents.push(peep);
    }
    houses[i].residents.forEach(peep => {
        peep.family = houses[i].residents;
    })
}
apartmentBuildings.forEach((apt) => {
    apt.residents = [];
    const { x, y } = apt;
    for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 11; j++) {
            const peep = Person({
                x: x - 150 + 50 * i + 0.01,
                y: y - 417 + 75 * j,
                home: apt,
                child: false
            });
            people.push(peep);
            apt.residents.push(peep);
        }
    }
    apt.residents.forEach(peep => {
        peep.family = apt.residents;
    })
})
let patientZero;

function setup() {
    patientZero = people[getRndInteger(0, people.length - 1)]
    patientZero.infected = -1;
    patientZero.imcon();
    skull = loadImage("skull.png");
    createCanvas(600, 600);
}
let targetTx;
let targetTy;
let targetScale;
let hoursPassed = 7;
let history = [{
    susceptible: 499,
    infected: 1,
    recovered: 0,
    dead: 0,
    totalCases: 1
}];
const diseaseChart = document.getElementById("diseaseChart");
let theChart;

function renderLineChart() {
    theChart = new Chart(diseaseChart, {
        type: "line",
        data: {
            labels: Object.keys(history).map(idx => idx / 2 + " Days"),
            datasets: [{
                data: history.map(x => x.susceptible),
                label: "Susceptible",
                fill: false,
                borderColor: "#3e95cd"
            }, {
                data: history.map(x => x.infected),
                label: "Infected",
                fill: false,
                borderColor: "#c45850"
            }, {
                data: history.map(x => x.recovered),
                label: "Recovered",
                fill: false,
                borderColor: "#3cba9f"
            }, {
                data: history.map(x => x.dead),
                label: "Dead",
                fill: false,
                borderColor: "#520707"
            }, {
                data: history.map(x => x.totalCases),
                label: "Total Cases",
                fill: false,
                borderColor: "#e8c3b9"
            }]
        },
        options: {
            title: {
                display: true,
                text: "History of the Outbreak"
            }
        }
    });
}

function updateLineChart({
    susceptible,
    infected,
    recovered,
    dead,
    totalCases
}) {
    theChart.data.labels.push((history.length - 1) / 2 + " Days");
    theChart.data.datasets.forEach(dataset => {
        switch (dataset.label) {
            case "Susceptible":
                dataset.data.push(susceptible);
                break;
            case "Infected":
                dataset.data.push(infected);
                break;
            case "Recovered":
                dataset.data.push(recovered);
                break;
            case "Dead":
                dataset.data.push(dead);
                break;
            case "Total Cases":
                dataset.data.push(totalCases);
                break;
        }
    })
    theChart.update();
}
renderLineChart();
let doneWithSimulation = false;
let funds = 0;
let fundsToGive = getRndInteger(2500, 5000);
let infusionsLeft = 3;
let tests = 10;
let testsLeft = test.maccap.value;
let testsToAdd = 0;
let confirmedCases = 0;
const pop = document.getElementById("pop");
const recovered = document.getElementById("recovered");
const susceptible = document.getElementById("susceptible");
const exposed = document.getElementById("exposed");
const infected = document.getElementById("infected");
const dead = document.getElementById("dead");
const scareLevel = document.getElementById("scareLevel");
const avgContent = document.getElementById("avgContent");
const avgAge = document.getElementById("avgAge");
const avgMon = document.getElementById("avgMon");
const avgSMon = document.getElementById("avgSMon");
const avgFood = document.getElementById("avgFood");
const avgPar = document.getElementById("avgPar");
const fundDisp = document.getElementById("funds");
const cashInfusionLeft = document.getElementById("cashInfusionLeft");
const numTests = document.getElementById("numTests");
const makeTest = document.getElementById("makeTest");
const testAcc = document.getElementById("testAcc");
const improveAcc = document.getElementById("improveAcc")
const testCost = document.getElementById("testCost");
const improveCP = document.getElementById("improveCP");
const remodelTest = document.getElementById("remodelTest");
const testDur = document.getElementById("testDur");
const improveEff = document.getElementById("improveEff");
const testMacCap = document.getElementById("testMacCap");
const improveMacPac = document.getElementById("improveMacPac");
const fpsDisplay = document.getElementById("fpsDisplay");
const confirmedCaseDisp = document.getElementById("confirmedCaseDisp");

function draw() {
    selectTick += 0.1;
    const oldDay = getDay();
    const oldHour = getHour();
    const oldMinute = getMinute();
    time += 6000 * timespeed;
    pop.innerHTML = `Population: ${people.length}`;
    recovered.innerHTML = `Recovered: ${people.filter(({infected}) => infected === -4).length}`;
    susceptible.innerHTML = `Susceptible: ${people.filter(({infected}) => infected === -3).length}`;
    exposed.innerHTML = `Exposed: ${people.filter(({infected}) => infected === -2).length}`;
    infected.innerHTML = `Infected: ${people.filter(({infected}) => infected > -2).length}`;
    dead.innerHTML = `Dead: ${500 - people.length}`;
    scareLevel.innerHTML = `Scare Level: ${scare.level.toFixed(3)}`;
    avgAge.innerHTML = `Average Age: ${(people.map(person => person.age).reduce((t, v) => t + v) / people.length).toFixed(3)}`;
    avgMon.innerHTML = `Average Money: $${(people.filter(person => person.money !== undefined).map(person => person.money).reduce((t, v) => t + v) / people.length).toFixed(2)}`;
    avgSMon.innerHTML = `Average Small Business Money: $${(smallBusinesses.map(biz => biz.money).reduce((t, v) => t + v) / smallBusinesses.length).toFixed(2)}`;
    avgFood.innerHTML = `Average Food Points Per Person: ${(people.map(person => person.food).reduce((t, v) => t + v) / people.length).toFixed(3)}`;
    avgPar.innerHTML = `Average Paranoia: ${(people.map(person => person.paranoia).reduce((t, v) => t + v) / people.length).toFixed(3)}`;
    avgContent.innerHTML = `Average Content: ${(people.filter(person => !Number.isNaN(person.content)).map(person => person.content).reduce((t, v) => t + v) / people.length).toFixed(3)}/100`;
    fundDisp.innerHTML = `Funds: $${funds.toFixed(2)}`;
    cashInfusionLeft.innerHTML = `Infusions Left: ${infusionsLeft}`;
    numTests.innerHTML = `Tests: ${tests}`;
    makeTest.innerHTML = `Make Test for $${test.cp.value.toFixed(2)} (${test.maccap.value - testsLeft} / ${test.maccap.value})`;
    testAcc.innerHTML = `Test Accuracy: ${(test.acc.value * 100).toFixed(2)}%`
    improveAcc.innerHTML = `Improve Test Accuracy for $${test.acc.costToImprove.toFixed(2)}`;
    testCost.innerHTML = `Test Cost: $${test.cp.value.toFixed(2)}`;
    improveCP.innerHTML = `Improve Cost of Production for $${test.cp.costToImprove.toFixed(2)}`;
    remodelTest.innerHTML = `Remodel Test for $${test.cp.costToRemodel.toFixed(2)}`;
    testDur.innerHTML = `Test Duration: ${(test.eff.value / 60).toFixed(2)} hours`;
    improveEff.innerHTML = `Improve Test Efficiency for $${test.eff.costToImprove.toFixed(2)}`;
    testMacCap.innerHTML = `Test Manufacturing Capacity: ${test.maccap.value + testsToAdd} tests / day`;
    improveMacPac.innerHTML = `Improve Manufacturing Capacity by 1 for $${test.maccap.costToImprove.toFixed(2)} (Takes Effect the Next Day)`;
    confirmedCaseDisp.innerHTML = `Confirmed Cases: ${confirmedCases}`;
    timespeed = 1 + 0.04 * (document.getElementById("tx").value - 1);
    document.getElementById("timeMult").innerHTML = `${timespeed.toFixed(2)}x`;
    if (!(selected && selected.isPerson)) {
        document.getElementById("dashboardButtons").innerHTML = "";
    }
    if (getDay() !== oldDay) {
        people.forEach(person => {
            person.refreshSchedule();
            person.handleContent();
        });
        scare.updateScare(-0.5);
        fundsToGive = random(2500, 5000);
        test.maccap.value += testsToAdd;
        testsToAdd = 0;
        testsLeft = test.maccap.value;
    }
    if (getHour() !== oldHour) {
        hoursPassed++;
    }
    if (getMinute() !== oldMinute) {
        const minuteNow = getDay() * 60 * 24 + getHour() * 60 + getMinute();
        const minuteThen = oldDay * 60 * 24 + oldHour * 60 + oldMinute;
        funds += fundsToGive / (24 * 60) * (minuteNow - minuteThen);
    }
    if (hoursPassed === 12 && !doneWithSimulation) {
        hoursPassed = 0;
        const record = {
            susceptible: people.filter(({ infected }) => infected === -3 || infected === -2).length,
            infected: people.filter(({ infected }) => infected > -2).length,
            recovered: people.filter(({ infected }) => infected === -4).length,
            dead: 500 - people.length,
            totalCases: 500 - people.filter(({ infected }) => infected === -3 || infected === -2).length
        };
        if (record.infected === 0) {
            doneWithSimulation = true;
        }
        history.push(record);
        updateLineChart(record);
    }
    timer.innerHTML = ms(time);
    background(200);
    scale(scaleVal);
    translate(tx, ty);
    if (targetTx) {
        tx += (targetTx - tx) / 10;
        if (Math.abs(targetTx - tx) < 10) {
            targetTx = undefined;
        }
    }
    if (targetTy) {
        ty += (targetTy - ty) / 10;
        if (Math.abs(targetTy - ty) < 10) {
            targetTy = undefined;
        }
    }
    if (targetScale) {
        scaleVal += (targetScale - scaleVal) / 10;
        if (Math.abs(targetScale - scaleVal) < 0.01) {
            scaleVal = targetScale;
            targetScale = undefined;
        }
    }
    roads.forEach(road => {
        road.draw();
    });
    houses.forEach(building => {
        building.draw();
        building.cc();
    });
    apartmentBuildings.forEach(building => {
        building.draw();
        building.cc();
    });
    smallBusinesses.forEach(building => {
        building.draw();
        building.cc();
    });
    schools.forEach(school => {
        school.draw();
        school.cc();
    });
    groceryStores.forEach(store => {
        store.draw();
        store.cc();
    });
    office.draw();
    office.cc();
    hospital.draw();
    hospital.cc();
    hospital.autoReturnVentilators();
    skulls.forEach(({ x, y }) => {
        fill(125);
        noStroke();
        ellipse(x + 15, y + 15, 30, 30);
        image(skull, x, y, 30, 30);
    });
    people.forEach(person => {
        person.draw();
        person.move();
        person.interpretSchedule();
        person.diseaseTick();
        //person.showDebugPath();
        person.cc();
    });
    if (selected) {
        selected.renderStats();
    }
}
let dragging = false;

function mouseInBounds() {
    return mouseX >= 0 && mouseY >= 0 && mouseX <= 600 && mouseY <= 600;
}

function mousePressed() {
    if (mouseInBounds()) {
        dragging = true;
    }
}

function mouseDragged() {
    if (dragging) {
        tx += (mouseX - pmouseX) * 1 / scaleVal;
        ty += (mouseY - pmouseY) * 1 / scaleVal;
    }
}

function mouseReleased() {
    dragging = false;
}

function keyPressed() {
    if (key === "e") {
        selected = undefined;
        dashboard.innerHTML = "";
        document.getElementById("dashboardButtons").innerHTML = "";
    }
}
document.getElementById("+").onclick = () => {
    scaleVal *= 1.5;
}
document.getElementById("-").onclick = () => {
    scaleVal /= 1.5;
}
document.getElementById("showSC").onclick = () => {
    document.getElementById('cityStats').style.display = 'block';
}
document.getElementById("instructions").onclick = () => {
    document.getElementById('instructionsModal').style.display = 'block';
}
document.getElementById("patientZero").onclick = () => {
    targetTx = -patientZero.x + 300;
    targetTy = -patientZero.y + 300;
    targetScale = 1;
}
const listStats = document.getElementById("listStats");
const chartStats = document.getElementById("chartStats");
document.getElementById("showListStats").onclick = () => {
    listStats.removeAttribute("hidden");
    chartStats.setAttribute("hidden", "true");
}
document.getElementById("showChartStats").onclick = () => {
    chartStats.removeAttribute("hidden");
    listStats.setAttribute("hidden", "true");
}
document.getElementById("cashBoost").onclick = () => {
    if (infusionsLeft > 0) {
        funds += random(1000, 3000);
        infusionsLeft -= 1;
    }
}
document.getElementById("openTest").onclick = () => {
    document.getElementById('testStats').style.display = 'block';
}
document.getElementById("makeTest").onclick = () => {
    if (funds >= test.cp.value && testsLeft > 0) {
        funds -= test.cp.value;
        tests += 1;
        testsLeft -= 1;
    }
}
document.getElementById("improveAcc").onclick = () => {
    if (funds >= test.acc.costToImprove) {
        funds -= test.acc.costToImprove;
        if (test.acc.value <= 0.8) {
            test.acc.value += random(0, 0.05);
        } else if (test.acc.value <= 0.9) {
            test.acc.value += random(0, 0.03);
        } else if (test.acc.value <= 0.95) {
            test.acc.value += random(0, 0.01)
        }
        if (test.acc.value > 0.95) {
            test.acc.value = 0.95;
            document.getElementById("improveAcc").setAttribute("disabled", "true")
        }
        test.acc.costToImprove += random(0, 100);
    }
}
document.getElementById("improveCP").onclick = () => {
    if (funds >= test.cp.costToImprove) {
        funds -= test.cp.costToImprove;
        test.cp.value *= random(0.8, 0.9);
        test.cp.costToImprove += random(0, 100);
    }
}
document.getElementById("remodelTest").onclick = () => {
    if (funds >= test.cp.costToRemodel) {
        funds -= test.cp.costToRemodel;
        test.cp.value *= max(min(randomGaussian(0.5, 0.25), 1), 0.25);
        test.cp.costToRemodel *= random(1.25, 1.75);
        test.cp.costToImprove += random(50, 150);
    }
}
document.getElementById("improveEff").onclick = () => {
    if (funds >= test.eff.costToImprove) {
        funds -= test.eff.costToImprove;
        test.eff.value *= random(0.5, 1);
        test.eff.costToImprove *= random(1.5, 2.5);
    }
}
document.getElementById("improveMacPac").onclick = () => {
    if (funds >= test.maccap.costToImprove) {
        funds -= test.maccap.costToImprove;
        testsToAdd += 1;
        test.maccap.costToImprove += random(10, 50);
    }
}
setInterval(() => {
    fpsDisplay.innerHTML = `FPS: ${Math.round(frameRate())}`;
}, 1000)
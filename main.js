const DEBUG = false;
let timespeed = 5;
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

function draw() {
    selectTick += 0.1;
    const oldDay = getDay();
    const oldHour = getHour();
    time += 6000 * timespeed;
    document.getElementById("pop").innerHTML = `Population: ${people.length}`;
    document.getElementById("recovered").innerHTML = `Recovered: ${people.filter(({infected}) => infected === -4).length}`;
    document.getElementById("susceptible").innerHTML = `Susceptible: ${people.filter(({infected}) => infected === -3).length}`;
    document.getElementById("exposed").innerHTML = `Exposed: ${people.filter(({infected}) => infected === -2).length}`;
    document.getElementById("infected").innerHTML = `Infected: ${people.filter(({infected}) => infected > -2).length}`;
    document.getElementById("dead").innerHTML = `Dead: ${500 - people.length}`;
    document.getElementById("avgContent").innerHTML = `Average Content: ${(people.map(person => person.content).reduce((t, v) => t + v) / people.length).toFixed(3)}/100`;
    document.getElementById("avgAge").innerHTML = `Average Age: ${(people.map(person => person.age).reduce((t, v) => t + v) / people.length).toFixed(3)}`;
    document.getElementById("avgMon").innerHTML = `Average Money: $${(people.filter(person => person.money !== undefined).map(person => person.money).reduce((t, v) => t + v) / people.length).toFixed(2)}`;
    document.getElementById("avgSMon").innerHTML = `Average Small Business Money: $${(smallBusinesses.map(biz => biz.money).reduce((t, v) => t + v) / smallBusinesses.length).toFixed(2)}`;
    document.getElementById("avgFood").innerHTML = `Average Food Points Per Person: ${(people.map(person => person.food).reduce((t, v) => t + v) / people.length).toFixed(3)}`;
    document.getElementById("avgContent").innerHTML = `Average Content: ${(people.filter(person => !Number.isNaN(person.content)).map(person => person.content).reduce((t, v) => t + v) / people.length).toFixed(3)}/100`;
    timespeed = 1 + 0.04 * (document.getElementById("tx").value - 1);
    document.getElementById("timeMult").innerHTML = `${timespeed.toFixed(2)}x`;
    if (getDay() !== oldDay) {
        people.forEach(person => {
            person.refreshSchedule();
            person.handleContent();
        });
    }
    if (getHour() !== oldHour) {
        hoursPassed++;
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
        history.push(record)
        updateLineChart(record);
    }
    timer.innerHTML = ms(time)
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
    })
    apartmentBuildings.forEach(building => {
        building.draw();
        building.cc();
    })
    smallBusinesses.forEach(building => {
        building.draw();
        building.cc();
    })
    schools.forEach(school => {
        school.draw();
        school.cc();
    })
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
    })
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
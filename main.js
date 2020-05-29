const DEBUG = false;
const timespeed = 1;
let tx = 0;
let ty = 0;
let scaleVal = 1;
const houses = [];
let time = 7 * 60 * 60 * 1000;
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
]
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
})

function setup() {
    createCanvas(600, 600);
}

function draw() {
    const oldDay = getDay();
    time += 6000 * timespeed;
    if (getDay() !== oldDay) {
        people.forEach(person => {
            person.refreshSchedule();
        });
    }
    timer.innerHTML = ms(time)
    background(200);
    scale(scaleVal);
    translate(tx, ty);
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
    })
    office.draw();
    office.cc();
    people.forEach(person => {
        person.draw();
        person.move();
        person.interpretSchedule();
        //person.showDebugPath();
        person.cc();
    });
    if (selected) {
        selected.renderStats();
    }
}

function mouseDragged() {
    tx += (mouseX - pmouseX) * 1 / scaleVal;
    ty += (mouseY - pmouseY) * 1 / scaleVal;
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
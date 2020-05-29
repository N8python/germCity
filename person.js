const pos = ({ x, y }) => `${x},${y}`;
const heuristic = (a, b) => {
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y)) / 100
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const dashboard = document.getElementById("dashboard");

function Person({
    x,
    y,
    home,
    child = false,
    groceryProvider = false,
    lastName
}) {
    let thePath = [];
    let speed = 1;
    let target;
    let targetTick = 0;
    let food = 0;
    const name = lastName ? faker.name.firstName() + " " + lastName : faker.name.findName();
    const age = child ? getRndInteger(5, 18) : getRndInteger(19, 80);
    let groceryStore;
    if (Math.hypot(x - groceryStores[0].x, y - groceryStores[0].y) < Math.hypot(x - groceryStores[1].x, y - groceryStores[1].y)) {
        groceryStore = groceryStores[0];
    } else {
        groceryStore = groceryStores[1];
    }
    let school;
    if (child) {
        if (age < 11) {
            school = schools[0];
        } else if (age < 14) {
            school = schools[1];
        } else {
            school = schools[2];
        }
    }
    let work;
    let money;
    let salary;
    if (!child) {
        work = (Math.random() < 0.65) ? smallBusinesses[Math.floor(Math.random() * smallBusinesses.length)] : office;
        if (work === office) {
            salary = getRndInteger(Math.floor(125 * 1.25), Math.floor(125 * 2));
        } else {
            salary = getRndInteger(Math.floor(125 * 0.5), Math.floor(125 * 1.5));
        }
        money = getRndInteger(100, 500);
    }
    const schedule = {
        0: { type: "nothing" },
        7: { type: "wander" }
    };
    if (child) {
        schedule[8] = { type: "goToSchool" }
        schedule[15] = { type: "headHome" }
        schedule[Math.floor(getRndInteger(19, 23))] = { type: "nothing" };
    } else {
        schedule[9] = { type: "goToWork" }
        schedule[17] = { type: "headHome" }
    }
    let mode = "nothing";
    let groceryTick = 0;
    const me = {
            interpretSchedule() {
                const item = schedule[getHour()];
                if (item && !item.done) {
                    item.done = true;
                    mode = item.type;
                    if (mode === "wander") {
                        let need = floor(random(25, 50));
                        if (food >= need) {
                            food -= need;
                        } else {
                            if (home.food) {
                                food -= need;
                                const amtToAdd = Math.min(Math.abs(food), home.food);
                                food += amtToAdd;
                                home.food -= amtToAdd;
                            } else {
                                food -= need;
                            }
                        }
                    }
                    if (mode === "goToSchool") {
                        target = null;
                        this.findPath(home, school);
                    }
                    if (mode === "goToWork") {
                        target = null;
                        this.findPath(home, work);
                    }
                    if (mode === "headHome") {
                        target = null;
                        money += salary;
                        if (home.food === undefined && food < 100) {
                            mode = "goToGroceryStore";
                            this.findPath(work, groceryStore)
                            target = work;
                        } else if (groceryProvider && (food < 0 || home.food < 400 || home.residents.some(({ food }) => food < 0))) {
                            mode = "goToGroceryStore";
                            this.findPath(work, groceryStore);
                            target = work;
                        } else if (child) {
                            this.findPath(school, home);
                        } else {
                            this.findPath(work, home);
                        }
                    }
                }
                switch (mode) {
                    case "nothing":
                        break;
                    case "wander":
                        if (!target) {
                            target = {
                                x: home.x + random(-home.width / 2, home.width / 2),
                                y: home.y + random(-home.height / 2, home.height / 2)
                            }
                            targetTick = random(15, 60);
                        }
                        speed = 0.3;
                        break;
                    case "goToSchool":
                        speed = 3;
                        if (thePath.length === 0) {
                            mode = "wanderSchool"
                        }
                        break;
                    case "goToWork":
                        speed = 3;
                        if (thePath.length === 0) {
                            mode = "wanderWork"
                        }
                        break;
                    case "wanderSchool":
                        if (!target) {
                            target = {
                                x: school.x + random(-100, 100),
                                y: school.y + random(-100, 100)
                            }
                            targetTick = random(60, 120);
                        }
                        speed = 0.3;
                        break;
                    case "wanderWork":
                        if (!target) {
                            target = {
                                x: work.x + random(-work.width / 2, work.width / 2),
                                y: work.y + random(-work.height / 2, work.height / 2)
                            }
                            targetTick = random(60, 120);
                        }
                        speed = 0.3;
                        break;
                    case "headHome":
                        speed = 3;
                        if (thePath.length === 0) {
                            /*if (home.food === undefined && food < 100) {
                                mode = "goToGroceryStore";
                                this.findPath(home, groceryStore)
                            } else {*/
                            mode = "wander";
                            //}
                        }
                        break;
                    case "goToGroceryStore":
                        speed = 3;
                        if (thePath.length === 0) {
                            mode = "wanderGroceryStore";
                            groceryTick = 240;
                        }
                        break;
                    case "wanderGroceryStore":
                        speed = 0.3;
                        if (!target) {
                            target = {
                                x: groceryStore.x + random(-50, 50),
                                y: groceryStore.y + random(-50, 50)
                            }
                        }
                        groceryTick--;
                        if (groceryTick < 1) {
                            const goal = groceryProvider ? floor(random(400, 2000)) : floor(random(100, 500));
                            let cost = goal / 10;
                            let amtToBuy = goal;
                            if (cost > money) {
                                amtToBuy = money * 10;
                                cost = money;
                            }
                            if (groceryStore.food - amtToBuy < 0) {
                                amtToBuy = groceryStore.food;
                            }
                            if (!groceryProvider) {
                                food += round(amtToBuy);
                            } else {
                                home.food += round(amtToBuy);
                            }
                            groceryStore.food -= round(amtToBuy);
                            money -= cost;
                            this.findPath(groceryStore, home);
                            mode = "headHome";
                        }
                        break;
                    default:
                        break;
                }
            },
            refreshSchedule() {
                Object.values(schedule).forEach(item => {
                    item.done = false;
                })
            },
            draw() {
                if (selected && selected === this) {
                    fill(180);
                } else {
                    fill(255)
                }
                noStroke();
                ellipse(x, y, 10, 10);
                targetTick--;
            },
            findPath(start, end) {
                if (x !== start.x || y !== start.y) {
                    target = start;
                }
                const frontier = new TinyQueue([{ x: start.x, y: start.y, cost: 0 }], function(a, b) {
                    return b.cost - a.cost;
                });
                const goal = {
                    x: end.x,
                    y: end.y
                };
                const visited = {};
                const cameFrom = {};
                const costSoFar = {};
                cameFrom[pos({ x: start.x, y: start.y })] = null;
                costSoFar[pos({ x: start.x, y: start.y })] = 0;
                while (frontier.length !== 0) {
                    const current = frontier.pop();
                    if (pos(current) === pos(goal)) {
                        break;
                    }
                    roads.filter((road) => (road.start.x === current.x && road.start.y === current.y) || (road.end.x === current.x && road.end.y === current.y)).forEach(({ start, end }) => {
                        const next = start.x === current.x && start.y === current.y ? ({
                            x: end.x,
                            y: end.y
                        }) : ({
                            x: start.x,
                            y: start.y
                        });
                        const newCost = costSoFar[pos(current)] + 1 + Math.hypot(next.x - current.x, next.y - current.y) / 100;
                        /*console.log(next, newCost);
                        console.log(current);
                        console.log(heuristic(goal, next));*/
                        if (!costSoFar[pos(next)] || newCost < costSoFar[pos(next)]) {
                            costSoFar[pos(next)] = newCost;
                            frontier.push({ x: next.x, y: next.y, cost: newCost - heuristic(goal, next) });
                            visited[pos(next)] = true;
                            cameFrom[pos(next)] = current;
                        }
                    })
                }
                let current = {
                    x: end.x,
                    y: end.y
                };
                const path = [];
                while (pos(current) !== pos(start)) {
                    path.push({
                        x: current.x,
                        y: current.y
                    });
                    current = cameFrom[pos(current)];
                }
                path.reverse();
                thePath = path;
                return path;
            },
            move() {
                const revisedSpeed = speed * timespeed;
                if (thePath.length > 0 && !target) {
                    if (abs((x - thePath[0].x)) + abs((y - thePath[0].y)) <= 1.5 * revisedSpeed) {
                        x = thePath[0].x;
                        y = thePath[0].y;
                        thePath.shift();
                    }
                    if (thePath.length > 0) {
                        if (Math.abs(x - thePath[0].x) <= 1 * revisedSpeed) {
                            if (y < thePath[0].y) {
                                y += revisedSpeed;
                            } else if (y > thePath[0].y) {
                                y -= revisedSpeed;
                            }
                        } else if (Math.abs(y - thePath[0].y) <= 1 * revisedSpeed) {
                            if (x < thePath[0].x) {
                                x += revisedSpeed;
                            } else if (x > thePath[0].x) {
                                x -= revisedSpeed;
                            }
                        }
                    }
                } else {
                    if (target && targetTick < 1) {
                        const xDist = target.x - x;
                        const yDist = target.y - y;
                        let direction;
                        if (xDist > 0 && yDist > 0) {
                            direction = degrees(atan(yDist / xDist));
                        } else if (xDist > 0 && yDist < 0) {
                            direction = 360 + degrees(atan(yDist / xDist));
                        } else {
                            direction = 180 + degrees(atan(yDist / xDist));
                        }
                        x += revisedSpeed * cos(radians(direction));
                        y += revisedSpeed * sin(radians(direction));
                        if (Math.hypot(target.x - x, target.y - y) <= revisedSpeed) {
                            target = undefined;
                        }
                    }
                }
            },
            showDebugPath() {
                thePath.forEach(({ x, y }, i) => {
                    if (thePath[i - 1]) {
                        stroke(255, 0, 0);
                        strokeWeight(10);
                        line(thePath[i - 1].x, thePath[i - 1].y, x, y);
                    }
                });
            },
            get x() {
                return x;
            },
            get y() {
                return y;
            },
            get name() {
                return name;
            },
            get home() {
                return home;
            },
            get age() {
                return age;
            },
            get money() {
                return money;
            },
            get salary() {
                return salary;
            },
            get food() {
                return food;
            },
            cc() {
                const [mx, my] = getMouseCoords();
                if (dist(x, y, mx, my) < 10 && mouseIsPressed) {
                    //this.renderStats();
                    selected = this;
                }
            },
            renderStats() {
                dashboard.innerHTML = `
            <h1>${name}</h1>
            <p>Age: ${age}</p>
            <p>Food: ${food}</p>
            ${ !child ? `<p>Money: $${money.toFixed(2)}</p>` : ""}
            ${DEBUG ? `
            <p>Path: ${thePath.map(pos).join("-")}</p>
            <p>Distance to next step: ${thePath.length > 0 ? abs((x - thePath[0].x)) + abs((y - thePath[0].y)) : ""}</p>
            <p>Distance to target: ${target ? Math.hypot(target.x - x, target.y - y) : ""}</p>
            <p>Mode: ${mode}</p>` : ""}
            `
        }

    }
    if (school) {
        school.residents.push(me);
    }
    if (work) {
        work.residents.push(me);
    }
    return me;
}
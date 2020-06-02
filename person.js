const pos = ({ x, y }) => `${x},${y}`;
const alignContent = (x) => 100 / (1 + Math.exp(-0.04 * x));
const heuristic = (a, b) => {
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y)) / 100
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRnd(min, max) {
    return Math.random() * (max - min) + min;
}
const dashboard = document.getElementById("dashboard");

function Person({
    x,
    y,
    home,
    child = false,
    groceryProvider = false,
    lastName,
    content = getRndInteger(-10, 10),
    contentMomentum = getRnd(-1, 1)
}) {
    let thePath = [];
    let contentList = [];
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
        [7 * 60 + getRndInteger(10, 30)]: { type: "wander" },
        [11 * 60 + getRndInteger(-120, 240)]: { type: "goOut", weekend: true }
    };
    if (child) {
        schedule[8 * 60 + getRndInteger(-30, 30)] = { type: "goToSchool", weekday: true }
        schedule[15 * 60 + getRndInteger(-30, 30)] = { type: "headHome", weekday: true }
        schedule[Math.floor(getRndInteger(19, 23)) * 60 + getRndInteger(-30, 30)] = { type: "nothing" };
    } else {
        schedule[9 * 60 + getRndInteger(-30, 30)] = { type: "goToWork", weekday: true }
        schedule[12 * 60 + getRndInteger(-30, 30)] = { type: "lunchBreak", weekday: true }
        schedule[17 * 60 + getRndInteger(-30, 30)] = { type: "headHome", weekday: true }
        schedule[15 * 60 + getRndInteger(0, 120)] = { type: "checkGroceryStore", weekend: true }
    }
    let mode = "nothing";
    let groceryTick = 0;
    let biz;
    let tHouse;
    let groceryDone = false;
    let wanderHouseTick = 0;
    let breakOver = 13 * 60 + getRndInteger(0, 30);
    const me = {
            interpretSchedule() {
                const item = schedule[getHour() * 60 + getMinute()];
                let prevMode;
                if (item && !item.done && (item.weekday ? isWeekday() : true) && (item.weekend ? !isWeekday() : true)) {
                    item.done = true;
                    prevMode = mode;
                    mode = item.type;
                    if (mode === "goOut") {
                        if (Math.random() < 0.5) {
                            mode = "visitHouse";
                        } else {
                            mode = "walk";
                        }
                    }
                    if (mode === "walk" && Math.random() < 0.33) {
                        this.createEvent({
                            magnitude: random(0.05, 0.1),
                            length: 1
                        });
                        this.findPath(home, roads[floor(random(roads.length))].end);
                    } else if (mode === "walk") {
                        mode = "wander";
                    }
                    if (mode === "visitHouse" && random() < 0.33) {
                        tHouse = houses[floor(random(houses.length))];
                        if (tHouse) {
                            this.createEventFromMap({
                                0.7: {
                                    magnitude: random(-0.05, 0.1),
                                    length: 1
                                },
                                0.9: {
                                    magnitude: random(0.1, 0.2),
                                    length: 1
                                },
                                1: {
                                    magnitude: random(-0.1, -0.3),
                                    length: 2
                                }
                            });
                            this.findPath(home, tHouse);
                        } else {
                            mode = "wander";
                        }
                    } else if (mode === "visitHouse") {
                        mode = "wander";
                    }
                    if (mode === "wander") {
                        this.createEventFromMap({
                            0.8: {
                                magnitude: random(0.3, -0.1),
                                length: 1
                            },
                            0.9: {
                                magnitude: random(0.5, 0.25),
                                length: 1
                            },
                            0.95: {
                                magnitude: random(-0.1, -0.3),
                                length: 2
                            },
                            1: {
                                magnitude: random(0.6, 0.3),
                                length: 2
                            }
                        });
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
                    if (mode === "lunchBreak") {
                        target = null;
                        biz = smallBusinesses[floor(random(smallBusinesses.length))];
                        this.findPath(work, biz);
                        this.createEventFromMap({
                            0.75: {
                                magnitude: random(0.1, 0.3),
                                length: 1
                            },
                            0.9: {
                                magnitude: random(-0.1, -0.3),
                                length: 1
                            },
                            1: {
                                magnitude: random(-0.3, -0.7),
                                length: 2
                            }
                        })
                    }
                    if (mode === "goToWork") {
                        target = null;
                        this.findPath(home, work);
                    }
                    if (mode === "checkGroceryStore" && prevMode === "wander") {
                        if (home.food === undefined && food < 100 && !groceryDone) {
                            mode = "goToGroceryStore";
                            this.findPath(home, groceryStore)
                            target = home;
                        } else if (groceryProvider && !groceryDone && (food < 0 || home.food < 400 || home.residents.some(({ food }) => food < 0))) {
                            mode = "goToGroceryStore";
                            this.findPath(home, groceryStore);
                            target = home;
                        } else {
                            mode = "wander";
                        }
                    } else if (mode === "checkGroceryStore") {
                        mode = prevMode;
                    }
                    if (mode === "headHome") {
                        target = null;
                        if (work) {
                            money += salary;
                            if (work.lowerPriceRange) {
                                work.money -= salary * 1 / 4;
                            }
                        }
                        if (home.food === undefined && food < 100 && !groceryDone && getHour() <= 17 && isWeekday()) {
                            mode = "goToGroceryStore";
                            this.findPath(work, groceryStore)
                            target = work;
                        } else if (groceryProvider && !groceryDone && getHour() <= 17 && (food < 0 || home.food < 400 || home.residents.some(({ food }) => food < 0)) && isWeekday()) {
                            mode = "goToGroceryStore";
                            this.findPath(work, groceryStore);
                            target = work;
                        } else if (child && isWeekday()) {
                            this.findPath(school, home);
                        } else if (isWeekday()) {
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
                            this.createEventFromMap({
                                0.4: {
                                    magnitude: random(-0.05, 0.05),
                                    length: 1
                                },
                                0.8: {
                                    magnitude: random(-0.1, 0.1),
                                    length: 1
                                },
                                0.9: {
                                    magnitude: random(0.1, 0.5),
                                    length: 2
                                },
                                1: {
                                    magnitude: random(-0.1, -0.5),
                                    length: 2
                                }
                            })
                            mode = "wanderSchool"
                        }
                        break;
                    case "visitHouse":
                        speed = 3;
                        if (thePath.length === 0) {
                            mode = "wanderHouse";
                            wanderHouseTick = floor(random(240, 360));
                        }
                        break;
                    case "walk":
                        speed = 3;
                        if (thePath.length === 0) {
                            mode = "headHome";
                            try {
                                this.findPath({
                                    x,
                                    y
                                }, home);
                            } catch (e) {

                            }
                        }
                        break;
                    case "wanderHouse":
                        if (tHouse) {
                            speed = 0.3;
                            if (!target) {
                                target = {
                                    x: tHouse.x + random(-tHouse.width / 2, tHouse.width / 2),
                                    y: tHouse.y + random(-tHouse.height / 2, tHouse.height / 2)
                                }
                                targetTick = random(15, 60);
                            }
                        } else {
                            mode = "wander";
                        }
                        wanderHouseTick--;
                        if (wanderHouseTick < 1) {
                            this.findPath(tHouse, home);
                            mode = "headHome";
                        }
                        break;
                    case "goToWork":
                        speed = 3;
                        if (thePath.length === 0) {
                            this.createEventFromMap({
                                0.4: {
                                    magnitude: random(-0.05, 0.05),
                                    length: 1
                                },
                                0.8: {
                                    magnitude: random(-0.1, 0.1),
                                    length: 1
                                },
                                0.9: {
                                    magnitude: random(0.1, 0.5),
                                    length: 2
                                },
                                1: {
                                    magnitude: random(-0.1, -0.5),
                                    length: 2
                                }
                            });
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
                    case "lunchBreak":
                        speed = 3;
                        if (thePath.length === 0 && !target) {
                            target = {
                                x: biz.x + random(-biz.width / 2, biz.width / 2),
                                y: biz.y + random(-biz.height / 2, biz.height / 2)
                            }
                        }
                        if (getHour() * 60 + getMinute() === breakOver) {
                            const price = random(biz.lowerPriceRange, biz.upperPriceRange);
                            if (money >= price * 4) {
                                money -= price;
                                biz.money += price;
                            }
                            mode = "goToWork";
                            this.findPath(biz, work);
                            target = biz;
                        }
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
                            groceryDone = true;
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
                groceryDone = false;
            },
            handleContent() {
                contentList.forEach(cl => {
                    const change = cl.pop();
                    contentMomentum += change;
                })
                contentList.forEach((cl, i) => {
                    if (cl.length === 0) {
                        contentList.splice(i, 1);
                    }
                })
            },
            createEvent({
                magnitude,
                length = 1
            } = {}) {
                const init = magnitude * random(0.75, 1.25);
                const decrease = 1 - 1 / (length * 1.5);
                const list = [];
                let curr = init;
                for (let i = 0; i < length - 1; i++) {
                    curr *= decrease * random(0.5, 1.5)
                    list.push(curr);
                }
                this.addContentList([init, ...list]);
            },
            createEventFromMap(map) {
                const rnd = Math.random();
                for (const [thresh, data] of Object.entries(map).sort(([t1], [t2]) => t1 - t2)) {
                    if (rnd < thresh) {
                        this.createEvent(data);
                        return;
                    }
                }
            },
            addContentList(cl) {
                const init = cl.pop();
                contentMomentum += init;
                if (cl.length !== 0) {
                    contentList.push(cl);
                }
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
                content += contentMomentum;
                contentMomentum *= 0.9;
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
                        const xDist = target.x - x + 0.00001;
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
            get content() {
                return alignContent(content);
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
            <p>Content: ${alignContent(content).toFixed(2)}/100</p>
            ${ !child ? `<p>Money: $${money.toFixed(2)}</p>` : ""}
            ${DEBUG ? `
            <p>Path: ${thePath.map(pos).join("-")}</p>
            <p>Distance to next step: ${thePath.length > 0 ? abs((x - thePath[0].x)) + abs((y - thePath[0].y)) : ""}</p>
            <p>Distance to target: ${target ? Math.hypot(target.x - x, target.y - y) : ""}</p>
            <p>Mode: ${mode}</p>
            <p>Wander House Tick: ${wanderHouseTick}</p>
            <p>Content Lists: ${JSON.stringify(contentList, undefined, 4)}</p>` : ""}
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
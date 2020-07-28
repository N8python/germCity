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
    content = getRndInteger(90, 100),
    contentMomentum = getRnd(-1, 1),
    infected = -3,
    family = []
}) {
    let thePath = [];
    let contentList = [];
    let followedPolicies = [];
    let speed = 1;
    let target;
    let targetTick = 0;
    let contagious = false;
    let food = 0;
    let conTimer;
    let stageTimer;
    let testTimer;
    let testState = 0;
    let wearingMask = false;
    let decidedToWearMask = false;
    let maskEfficiency = Math.random() * 0.5 + 0.25;
    let workNextDay = true;
    let hospitalRoom;
    const name = lastName ? faker.name.firstName() + " " + lastName : faker.name.findName();
    const age = child ? getRndInteger(5, 18) : getRndInteger(19, 80);
    let paranoia = Math.random();
    let groceryStore;
    if (Math.hypot(x - groceryStores[0].x, y - groceryStores[0].y) < Math.hypot(x - groceryStores[1].x, y - groceryStores[1].y)) {
        groceryStore = groceryStores[0];
    } else {
        groceryStore = groceryStores[1];
    }
    let hygieneChance = getRnd(0.00025, 0.001);
    let school;
    let schoolDays;
    if (child) {
        if (age < 11) {
            school = schools[0];
        } else if (age < 14) {
            school = schools[1];
        } else {
            school = schools[2];
        }
        if (Math.random() <= 0.5) {
            schoolDays = ["Monday", "Wednesday"];
        } else {
            schoolDays = ["Tuesday", "Thursday"];
        }
    }
    let work;
    let money;
    let salary;
    let sickState = 0;
    let ventilator = 0;
    if (!child) {
        if (Math.random() < 0.95) {
            work = (Math.random() < 0.65) ? smallBusinesses[Math.floor(Math.random() * smallBusinesses.length)] : office;
        } else {
            work = hospital;
        }
        if (work === office) {
            salary = getRndInteger(Math.floor(125 * 1.25), Math.floor(125 * 2));
        } else if (work === hospital) {
            salary = getRndInteger(Math.floor(125 * 2), Math.floor(125 * 4));
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
        if (work !== hospital) {
            schedule[12 * 60 + getRndInteger(-30, 30)] = { type: "lunchBreak", weekday: true }
        }
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
    let sayAtHomeForRestOfDay = false;
    const me = {
            get isPerson() {
                return true;
            },
            interpretSchedule() {
                const item = schedule[getHour() * 60 + getMinute()];
                let prevMode;
                if (item && mode !== "goToHospital" && mode !== "wanderHospital" && mode !== "headHomeHospital" && !item.done && (item.weekday ? isWeekday() : true) && (item.weekend ? !isWeekday() : true) && this.isSickCompatible(item.type) && this.isStaggerCompatible(item.type)) {
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
                } else if (item && item.type === "checkGroceryStore" && mode !== "checkGroceryStore" && ((followedPolicies.includes("closeOffice") && work === office) || (followedPolicies.includes("closeSmallBusinesses") && work && work.isSmallBusiness))) {
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
                            targetTick = random(15, 60) / timespeed;
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
                            mode = "wanderSchool";
                        }
                        break;
                    case "visitHouse":
                        speed = 3;
                        if (thePath.length === 0) {
                            mode = "wanderHouse";
                            wanderHouseTick = floor(random(240, 360)) / timespeed;
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
                                targetTick = random(15, 60) / timespeed;
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
                            targetTick = random(60, 120) / timespeed;
                        }
                        speed = 0.3;
                        break;
                    case "wanderWork":
                        if (!target) {
                            target = {
                                x: work.x + random(-work.width / 2, work.width / 2),
                                y: work.y + random(-work.height / 2, work.height / 2)
                            }
                            targetTick = random(60, 120) / timespeed;
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
                            groceryTick = 240 / timespeed;
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
                    case "goToHospital":
                        speed = 3;
                        if (thePath.length === 0) {
                            if (hospital.canCheckIn()) {
                                hospitalRoom = hospital.checkIn(this);
                                mode = "wanderHospital"
                            } else {
                                this.findPath(hospital, home);
                                mode = "headHomeHospital";
                            }
                        }
                        break;
                    case "wanderHospital":
                        if (!target && disease.phases[infected].symptoms !== "ards") {
                            target = {
                                x: hospital.x - 200 + hospitalRoom[0] + random(100),
                                y: hospital.y - 200 + hospitalRoom[1] + random(100)
                            }
                            targetTick = random(60, 120) / timespeed;
                        }
                        speed = 0.3;
                        break;
                    case "headHomeHospital":
                        speed = 3;
                        if (thePath.length === 0) {
                            sayAtHomeForRestOfDay = true;
                            mode = "wander";
                        }
                        break;
                    default:
                        break;
                }
            },
            refreshSchedule() {
                followedPolicies = enactedLockdownPolicies;
                Object.values(schedule).forEach(item => {
                    item.done = false;
                })
                groceryDone = false;
                sayAtHomeForRestOfDay = false;
                if (followedPolicies.includes("closeSmallBusinesses") && work && work.isSmallBusiness) {
                    if (followedPolicies.includes("totalLockdown")) {
                        workNextDay = false;
                    } else {
                        workNextDay = Math.random() < 1 - paranoia;
                    }
                } else {
                    workNextDay = true;
                }
                if (sickState === 1) {
                    sickState = 2;
                }
                if (infected > -1) {
                    const { symptoms, recovery } = disease.phases[infected];
                    let mag;
                    if (recovery) {
                        mag = random(0.3, 0.6) * max(0.98 ** (this.content - 70) - 1, 0.5);
                    } else {
                        if (symptoms === "mild respiratory") {
                            mag = random(-0.1, -0.3);
                        }
                        if (symptoms === "moderate respiratory") {
                            mag = random(-0.2, -0.4);
                        }
                        if (symptoms === "pneumonia") {
                            mag = random(-0.3, -0.6);
                        }
                        if (symptoms === "ards") {
                            mag = random(-0.6, -1);
                        }
                    }
                    this.createEvent({
                        magnitude: mag,
                        length: 1
                    });
                }
            },
            handleContent() {
                contentList.forEach(cl => {
                    const change = cl.pop();
                    if (typeof change === "number" && change === change) {
                        contentMomentum += change;
                    }
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
                    curr *= decrease * random(0.5, 1.5);
                    list.push(curr);
                }
                const final = [init, ...list];
                this.addContentList(final);
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
                if (typeof init === "number" && init === init) {
                    contentMomentum += init;
                }
                if (cl.length !== 0) {
                    contentList.push(cl);
                }
            },
            bumpHygiene(x) {
                hygieneChance += random(0.0001, 0.0003) * x;
            },
            get hygieneChance() {
                return hygieneChance;
            },
            draw() {
                const mult = maskMultiplier[maskStatus];
                if (paranoia < scare.level * mult) {
                    decidedToWearMask = true;
                } else {
                    decidedToWearMask = false;
                }
                if (decidedToWearMask) {
                    if (mode === "wanderWork" || mode === "wanderSchool" || mode === "wanderGroceryStore" || mode === "lunchBreak" || mode === "wanderHouse") {
                        wearingMask = true;
                    } else {
                        wearingMask = false;
                    }
                } else {
                    wearingMask = false;
                }
                let color;
                if (infected === -4) {
                    color = [125, 255, 125]
                } else if (infected === -3) {
                    color = [255, 255, 255];
                } else if (infected === -2) {
                    color = [255, 255, 125]
                } else if (infected === -1) {
                    color = [255, 160, 160]
                } else if (infected > -1) {
                    color = [175, 100, 175]
                } else {
                    color = [255, 255, 255];
                }
                if (selected && selected === this) {
                    fill(...color.map(x => x * 0.71));
                } else {
                    fill(...color)
                }
                noStroke();
                ellipse(x, y, 10, 10);
                if (ventilator) {
                    textAlign(CENTER);
                    text("V", x, y);
                    rect(x, y - 10, 12, 5);
                }
                if (wearingMask) {
                    stroke(200);
                    strokeWeight(1);
                    line(x - 5, y, x - 2.5, y)
                    line(x + 5, y, x + 2.5, y)
                    rectMode(CENTER);
                    fill(200);
                    rect(x, y, 5, 2.5);
                }
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
            get infected() {
                return infected;
            },
            get paranoia() {
                return paranoia;
            },
            set paranoia(val) {
                paranoia = val;
                if (paranoia > 1) {
                    paranoia = 1;
                }
                if (paranoia < 0) {
                    paranoia = 0;
                }
            },
            set infected(val) {
                infected = val;
                if (val === -1) {
                    stageTimer = random(...disease.incubation.range) * day;
                    conTimer = stageTimer + (random(...disease.incubation.contagiousnessBegins) * day);
                }
            },
            get family() {
                return family;
            },
            set family(val) {
                family = val;
            },
            get hospitalNum() {
                return hospitalRoom[2];
            },
            get followedPolicies() {
                return followedPolicies;
            },
            imcon() {
                conTimer = 0;
            },
            isSickCompatible(_item) {
                if (sickState === 2 || sayAtHomeForRestOfDay) {
                    if (_item === "wander" || _item === "nothing") {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            isStaggerCompatible(_item) {
                if ((followedPolicies.includes("staggerSchools") || followedPolicies.includes("closeSchools")) && child) {
                    if (schoolDays.includes(dayOfTheWeek(getDay())) && !followedPolicies.includes("closeSchools")) {
                        return true;
                    }
                    return _item === "nothing" || _item === "wander";
                }
                if ((followedPolicies.includes("closeOffice") && work === office) || (work && work.isSmallBusiness && workNextDay === false)) {
                    return ["nothing", "wander", "checkGroceryStore"].includes(_item);
                }
                return true;
            },
            toggleVentilator() {
                ventilator = +!ventilator;
            },
            get usingVentilator() {
                return !!ventilator;
            },
            diseaseTick() {
                if (conTimer !== undefined) {
                    conTimer -= 6000 * timespeed;
                }
                if (stageTimer !== undefined) {
                    stageTimer -= 6000 * timespeed;
                }
                if (testTimer !== undefined) {
                    testTimer -= 6000 * timespeed;
                }
                if (testTimer < 1) {
                    testTimer = undefined;
                    let positive = false;
                    if (Math.random() <= test.acc.value && infected >= -2) {
                        positive = true;
                    }
                    if (positive) {
                        Swal.fire({
                            icon: `info`,
                            title: `${name}'s Test is Positive`,
                            confirm: "Ok"
                        });
                        confirmedCases += 1;
                        testState = 2;
                    } else {
                        Swal.fire({
                            icon: `info`,
                            title: `${name}'s Test is Negative`,
                            confirm: "Ok"
                        });
                        testState = 0;
                    }
                    this.setupRender();
                }
                if (conTimer < 0 && infected !== -4) {
                    contagious = true;
                }
                if (stageTimer < 0 && infected !== -4) {
                    if (infected < 0) {
                        sickState = 1;
                        infected = 0;
                        stageTimer = random(...disease.phases[infected].range) * day;
                    } else {
                        const num = Math.max(0, Math.min(1, randomGaussian(disease.phases[infected].progressionFunc(age), 0.5)));
                        let newPhase;
                        Object.entries(disease.phases[infected].next).some(([stage, thresh]) => {
                            if (num <= thresh) {
                                newPhase = stage;
                                return true;
                            }
                        })
                        if (newPhase === "resolve") {
                            infected = -4;
                            this.paranoia += 0.3;
                            scare.updateScare(-0.25);
                            contagious = false;
                            sickState = 0;
                        } else {
                            let mortality = disease.phases[infected].mortalityRate / 100;
                            const _x = hospital.doctorsToPatientsRatio();
                            if (disease.phases[infected].symptoms === "pneumonia" && mode === "wanderHospital") {
                                mortality *= (0.8 / (1 + Math.exp(5 * _x - 2))) + 0.2;
                            }
                            if (disease.phases[infected].symptoms === "ards" && mode === "wanderHospital") {
                                mortality *= 0.84;
                                if (ventilator) {
                                    mortality *= (0.6 / (1 + Math.exp(7 * _x - 2))) + 0.4;
                                }
                            }
                            //console.log(disease.phases[infected].symptoms, mortality);
                            if (Math.random() <= mortality) {
                                scare.updateScare(2.5);
                                people.splice(people.indexOf(this), 1);
                                if (mode === "wanderHospital") {
                                    hospital.checkOut(this);
                                }
                                if (ventilator) {
                                    hospital.returnVentilator(this);
                                }
                                if (home.isApartmentBuilding) {
                                    family.forEach(person => {
                                        if (person !== this) {
                                            person.createEvent({
                                                magnitude: random(-0.25, -0.5),
                                                length: 2
                                            })
                                        }
                                        person.paranoia -= 0.2;
                                    })
                                } else {
                                    family.forEach(person => {
                                        if (person !== this) {
                                            person.createEvent({
                                                magnitude: random(-0.75, -1.5),
                                                length: 3
                                            })
                                        }
                                        person.paranoia -= 0.4;
                                    })
                                }
                                skulls.push({
                                    x: x - 15,
                                    y: y - 15
                                })
                            } else {
                                infected = newPhase;
                                if (disease.phases[infected].symptoms !== "ards") {
                                    if (ventilator) {
                                        hospital.returnVentilator(this);
                                    }
                                }
                                if (infected > -1) {
                                    stageTimer = random(...disease.phases[infected].range) * day;
                                }
                            }
                        }
                        //console.log(newPhase);
                    }
                    if (infected > -1 && disease.phases[infected].symptoms === "pneumonia") {
                        mode = "goToHospital";
                        target = null;
                        this.findPath(home, hospital);
                    }
                    if (infected > -1 && hospital.patients.includes(this) && people.includes(this) && disease.phases[infected].symptoms === "ards") {
                        if (hospital.canTakeVentilator()) {
                            hospital.takeVentilator(this);
                        }
                    }
                    if (infected === -4 && mode === "wanderHospital") {
                        mode = "headHomeHospital";
                        target = null;
                        this.findPath(hospital, home);
                        hospital.checkOut(this);
                        hospitalRoom = undefined;
                        if (ventilator) {
                            hospital.returnVentilator(this);
                        }
                    }
                }
                if (infected === -2) {
                    if (Math.random() < hygieneChance * timespeed) {
                        this.infected = -3;
                    } else if (Math.random() < disease.exposureToCaseChance * timespeed) {
                        this.infected = -1;
                        this.paranoia -= 0.15;
                        family.forEach(person => {
                            if (person !== this) {
                                person.paranoia -= 0.05;
                            }
                        })
                        scare.updateScare(1);
                    }
                }
                if (contagious && infected > -2) {
                    const range = infected < 0 ? disease.initContagiousRange : disease.phases[infected].contagiousRange;
                    const chance = infected < 0 ? disease.initContagiousness * timespeed : disease.phases[infected].contagiousness * timespeed;
                    const rangeReduction = wearingMask ? maskEfficiency : 1;
                    if (sickState === 2 && (mode === "nothing" || mode === "wander")) {
                        family.forEach(person => {
                            if (dist(x, y, person.x, person.y) < range * rangeReduction && person.infected === -3) {
                                if (Math.random() < chance) {
                                    person.infected = -2;
                                }
                            }
                        })
                    } else {
                        people.forEach(person => {
                            if (dist(x, y, person.x, person.y) < range * rangeReduction && person.infected === -3) {
                                if (Math.random() < chance) {
                                    person.infected = -2;
                                }
                            }
                        })
                    }
                }
            },
            get content() {
                return alignContent(content);
            },
            cc() {
                const [mx, my] = getMouseCoords();
                if (mouseInBounds() && dist(x, y, mx, my) < 5 && mouseIsPressed) {
                    //this.renderStats();
                    if (selected !== this) {
                        this.setupRender();
                    }

                    selected = this;
                }
            },
            renderStats() {
                dashboard.innerHTML = `
            <h1>${name}</h1>
            <p>Age: ${age}</p>
            <p>Food: ${food}</p>
            <p>Contagious: ${contagious}</p>
            <p>Symptomatic: ${infected > -1}</p>
            <p>Paranoia: ${paranoia.toFixed(3)}</p>
            <p>
            ${ infected > - 1?`<p>Symptoms: ${disease.phases[infected].symptoms}</p>` : ""}
            ${ !child ? `<p>Money: $${money.toFixed(2)}</p>` : ""}
            ${ (testState === 1) ? `<p>Test Time Left: ${(testTimer / hour).toFixed(2)} hours`: ""}
            ${DEBUG ? `
            <p>Path: ${thePath.map(pos).join("-")}</p>
            <p>Distance to next step: ${thePath.length > 0 ? abs((x - thePath[0].x)) + abs((y - thePath[0].y)) : ""}</p>
            <p>Distance to target: ${target ? Math.hypot(target.x - x, target.y - y) : ""}</p>
            <p>Mode: ${mode}</p>
            <p>Wander House Tick: ${wanderHouseTick}</p>
            <p>Content Lists: ${JSON.stringify(contentList, undefined, 4)}</p>
            <p>Contagious Timer: ${conTimer}</p>
            <p>Stage Timer: ${stageTimer}</p>
            <p>Infected: ${infected}</p>
            <p>Sick State: ${sickState}</p>
            <p>Test State: ${testState}</p>
            <p>Test Timer: ${testTimer}</p>
            ` : ""}
            `
        },
        setupRender() {
            document.getElementById("dashboardButtons").innerHTML = "";
            setTimeout(() => {
                const dashboardButtons = document.getElementById("dashboardButtons");
            if (!dashboardButtons.innerHTML.includes("<button")) {
                const testButton = document.createElement("button");
                testButton.classList.add("w3-btn", "w3-border", "w3-round-xlarge", "styled-btn");
                if (testState === 0) {
                    testButton.innerHTML = "Test";
                } else if (testState === 1) {
                    testButton.innerHTML = "Testing...";
                    testButton.setAttribute("disabled", "true");
                } else if (testState === 2) {
                    testButton.innerHTML = "Tested";
                    testButton.setAttribute("disabled", "true");
                }
                testButton.onclick = () => {
                    if (name === selected.name) {
                        testButton.innerHTML = "Testing...";
                        testState = 1;
                        testTimer = test.eff.value * minute;
                        testButton.setAttribute("disabled", "true")
                        tests -= 1;
                    } else if (tests < 0) {
                        Swal.fire({
                            title: 'No Tests Available',
                            text: 'Produce a test in order to test someone - as you currently have 0 tests.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                          })
                    }
                }
                dashboardButtons.appendChild(testButton);
            }

            }, 0)
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
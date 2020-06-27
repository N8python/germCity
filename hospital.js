function Hospital({
    x,
    y
}) {
    const name = faker.address.streetName().split(" ")[0];
    const residents = [];
    const patients = [];
    let maxCapacity = 8;
    let ventilators = 1;
    let maxVentilators = 1;
    return {
        draw() {
            if (selected === this) {
                drawBounds(x, y, 600, 600);
            }
            fill("magenta");
            noStroke();
            rect(x, y, 500, 500, 100);
            strokeWeight(100);
            stroke(255, 100, 100);
            line(x - 200, y, x + 200, y);
            line(x, y - 200, x, y + 200);
            stroke(255, 150, 255);
            strokeWeight(20);
            line(x - 200, y - 200, x - 200, y - 50);
            point(x - 200, y - 20);
            patients.forEach(({ hospitalNum: idx }) => {
                drawBounds(x - 150 + 100 * (idx % 4), y - 150 + 100 * Math.floor(idx / 4), 100, 100);
            })
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get width() {
            return 400;
        },
        get height() {
            return 400;
        },
        get residents() {
            return residents;
        },
        canCheckIn() {
            return patients.length + 1 <= maxCapacity;
        },
        checkIn(person) {
            patients.push(person);
            const roomsTaken = patients.filter(patient => patient !== person).map(patient => patient.hospitalNum);
            let idx = 0;
            while (roomsTaken.includes(idx)) {
                idx++;
            }
            return [100 * (idx % 4), 100 * Math.floor(idx / 4), idx];
        },
        checkOut(person) {
            patients.splice(patients.indexOf(person), 1);
        },
        canTakeVentilator() {
            return ventilators > 0;
        },
        takeVentilator(person) {
            ventilators -= 1;
            person.toggleVentilator();
        },
        returnVentilator(person) {
            ventilators += 1;
            person.toggleVentilator();
        },
        cc() {
            const [mx, my] = getMouseCoords();
            if (mouseInBounds() && mx >= x - 200 && mx <= x + 200 && my >= y - 200 && my <= y + 200 && mouseIsPressed) {
                selected = this;
            }
        },
        doctorsToPatientsRatio() {
            return residents.filter(doctor => doctor.infected < 0).length / Math.max(patients.length, 1);
        },
        autoReturnVentilators() {
            if (!patients.some(patient => patient.usingVentilator)) {
                ventilators = maxVentilators;
            }
        },
        renderStats() {
            dashboard.innerHTML = "";
            dashboard.innerHTML = `<h1>The ${name} Hospital</h1>`
        }
    }
}
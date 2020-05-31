function Office({
    x,
    y,
    color
}) {
    const name = faker.company.companyName();
    const type = Math.random() < 0.5 ? "Firm" : "Company";
    const residents = [];
    return {
        draw() {
            fill(color);
            if (selected === this) {
                stroke(0, 125, 125);
                strokeWeight(10);
            } else {
                noStroke();
            }
            rect(x, y, 400, 600);
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
            return 600;
        },
        get residents() {
            return residents;
        },
        cc() {
            const [mx, my] = getMouseCoords();
            if (mx >= x - 200 && mx <= x + 200 && my >= y - 300 && my <= y + 300 && mouseIsPressed) {
                selected = this;
            }
        },
        renderStats() {
            dashboard.innerHTML = `<h1>The ${name} ${type}</h1>
            <p>Employees: ${residents.length}</p>`
        }
    }
}
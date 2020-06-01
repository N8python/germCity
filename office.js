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
            fill(229, 74, 165);
            if (selected === this) {
                drawBounds(x, y, 500, 700);
            }
            noStroke();
            rect(x, y, 400, 600, 30);
            stroke(236, 146, 225);
            strokeWeight(20);
            line(x - 170, y - 250, x - 170, y - 50);
            point(x - 170, y - 20);
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
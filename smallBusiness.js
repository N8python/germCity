function SmallBusiness({
    x,
    y,
    color
}) {
    const name = `The ${faker.commerce.productName()} Company`;
    const residents = [];
    return {
        draw() {
            fill(color);
            if (selected === this) {
                stroke(150);
                strokeWeight(10);
            } else {
                noStroke();
            }
            rectMode(CENTER);
            rect(x, y, 200, 200);
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get width() {
            return 200;
        },
        get height() {
            return 200;
        },
        get residents() {
            return residents;
        },
        cc() {
            const [mx, my] = getMouseCoords();
            if (mx >= x - 100 && mx <= x + 100 && my >= y - 100 && my <= y + 100 && mouseIsPressed) {
                selected = this;
            }
        },
        renderStats() {
            dashboard.innerHTML = `<h1>${name}</h1>
            <p>Employees: ${residents.length}</p>`
        }
    }
}
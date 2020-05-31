function SmallBusiness({
    x,
    y,
    color
}) {
    const name = `The ${faker.commerce.productName()} Company`;
    const residents = [];
    let money = 0;
    return {
        draw() {
            fill(color);
            if (selected === this) {
                stroke(0, 125, 125);
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
        get money() {
            return money;
        },
        set money(val) {
            money = val;
        },
        lowerPriceRange: getRndInteger(5, 15),
        upperPriceRange: getRndInteger(30, 60),
        cc() {
            const [mx, my] = getMouseCoords();
            if (mx >= x - 100 && mx <= x + 100 && my >= y - 100 && my <= y + 100 && mouseIsPressed) {
                selected = this;
            }
        },
        renderStats() {
            dashboard.innerHTML = `<h1>${name}</h1>
            <p>Employees: ${residents.length}</p>
            <p>Money: $${money.toFixed(2)}</p>`
        }
    }
}
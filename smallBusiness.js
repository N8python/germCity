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
            fill(152, 53, 252);
            if (selected === this) {
                drawBounds(x, y, 300, 300);
            }
            noStroke();
            rectMode(CENTER);
            rect(x, y, 200, 200, 30);
            strokeWeight(20);
            stroke(184, 98, 253)
            point(x - 80, y - 50);
            line(x - 80, y - 20, x - 80, y + 60)
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
            if (mouseInBounds() && mx >= x - 100 && mx <= x + 100 && my >= y - 100 && my <= y + 100 && mouseIsPressed) {
                selected = this;
            }
        },
        get isSmallBusiness() {
            return true;
        },
        renderStats() {
            dashboard.innerHTML = `<h1>${name}</h1>
            <p>Employees: ${residents.length}</p>
            <p>Money: $${money.toFixed(2)}</p>`
        }
    }
}
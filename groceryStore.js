function GroceryStore({
    x,
    y,
    color
}) {
    let maxFood = 40000;
    let food = 20000;
    const name = faker.address.streetName().split(" ")[0];
    return {
        draw() {
            if (selected === this) {
                stroke(0, 125, 125);
                strokeWeight(10);
            } else {
                noStroke();
            }
            fill(color);
            triangle(x, y - 200, x + 200, y + 200, x - 200, y + 200);
            const percent = food / maxFood;
            fill(255, 125, 0);
            quad(x + 200, y + 200, x + 200 - 200 * percent, y + 200 - 400 * percent, x - 200 + 200 * percent, y + 200 - 400 * percent, x - 200, y + 200);
            if (food < maxFood) {
                food += 2.77777777778 * timespeed;
            } else {
                food = maxFood;
            }
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get food() {
            return food;
        },
        set food(val) {
            food = val;
        },
        cc() {
            const [mx, my] = getMouseCoords();
            if (mx >= x - 200 && mx <= x + 200 && my >= y - 200 && my <= y + 200 && mouseIsPressed) {
                selected = this;
            }
        },
        renderStats() {
            dashboard.innerHTML = `<h1>The ${name} Grocery Store</h1>
            <p>Food: ${Math.round(food)}/${maxFood}</p>`
        }
    }
}
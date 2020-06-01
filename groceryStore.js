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
                drawBounds(x, y + 50, 450, 500)
            }
            noStroke();
            fill(227, 223, 0);
            stroke(227, 223, 0);
            strokeWeight(30);
            triangle(x, y - 185, x + 185, y + 185, x - 185, y + 185);
            const percent = food / maxFood;
            fill(255, 125, 0);
            stroke(255, 125, 0);
            quad(x + 185, y + 185, x + 185 - 185 * percent, y + 185 - 185 * 2 * percent, x - 185 + 185 * percent, y + 185 - 185 * 2 * percent, x - 185, y + 185);
            stroke(254, 250, 97);
            strokeWeight(20);
            line(x - 5 + 5, y - 175, x - 185 / 2 + 25 + 5 + 12.5, y - 75);
            point(x - 185 + 120, y - 45);
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
function House({
    x,
    y,
    color,
    scale = 1
}) {
    const size = scale * 50;
    let food = 0;
    return {
        draw() {
            fill(color);
            rectMode(CENTER);
            if (selected === this) {
                stroke(0, 125, 125);
                strokeWeight(5);
            } else {
                noStroke();
            }
            rect(x, y, size, size)
            triangle(x - size / 1.5, y - size / 3, x + size / 1.5, y - size / 3, x, y - size);
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get height() {
            return 25;
        },
        get width() {
            return 25;
        },
        get food() {
            return food;
        },
        set food(val) {
            food = val;
        },
        cc() {
            const [mx, my] = getMouseCoords();
            if (mx >= (x - size / 2) && my >= (y - (size / 2 + size / 3)) && mx < x + size / 2 && my < y + size / 2 && mouseIsPressed) {
                selected = this;
            }
        },
        renderStats() {
            let residentString = "";
            this.residents.forEach(({ name, age }) => {
                residentString += `<li>${name.split(" ")[0]} - Age: ${age}</li>`;
            });
            dashboard.innerHTML = `
            <h1>The ${this.name} House</h1>
            <ul>
            ${residentString}
            </ul>
            <p>Food: ${food}</p>
                `
        }
    }
}
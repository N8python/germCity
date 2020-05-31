function School({
    x,
    y,
    color,
    role
}) {
    const name = faker.address.streetName().split(" ")[0];
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
            rectMode(CENTER)
            quad(x, y - 200, x + 200, y, x, y + 200, x - 200, y);
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get residents() {
            return residents;
        },
        cc() {
            const [mx, my] = getMouseCoords();
            if (mx >= x - 200 && mx <= x + 200 && my >= y - 200 && my <= y + 200 && mouseIsPressed) {
                selected = this;
            }
        },
        renderStats() {
            dashboard.innerHTML = `
            <h1>The ${name} ${role}</h1>
            <p>Students: ${this.residents.length}</p>`;
        }
    }
}
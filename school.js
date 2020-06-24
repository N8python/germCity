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
                drawBounds(x, y, 400, 400);
            }
            noStroke();
            rectMode(CENTER);
            strokeJoin(ROUND);
            stroke(color);
            strokeWeight(50);
            quad(x, y - 175, x + 175, y, x, y + 175, x - 175, y);
            stroke(170, 246, 97);
            strokeWeight(20);
            line(x - 125, y - 50, x, y - 175);
            point(x - 150, y - 25);
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
            if (mouseInBounds() && mx >= x - 200 && mx <= x + 200 && my >= y - 200 && my <= y + 200 && mouseIsPressed) {
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
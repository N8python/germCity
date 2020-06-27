function ApartmentBuilding({
    x,
    y,
    color
}) {
    const name = faker.address.streetName().split(" ")[0];
    return {
        draw() {
            rectMode(CENTER);
            fill(color);
            if (selected === this) {
                drawBounds(x, y, 400, 900);
            }
            noStroke();
            rect(x, y, 300, 800, 60);
            if (color === "red") {
                stroke(233, 124, 216);
            } else if (color === "blue") {
                stroke(111, 221, 251);
            }
            strokeWeight(20);
            line(x - 120, y - 350, x - 120, y - 40);
            point(x - 120, y);
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get width() {
            return 300;
        },
        get height() {
            return 800;
        },
        isApartmentBuilding: true,
        cc() {
            const [mx, my] = getMouseCoords();
            if (mouseInBounds() && mx >= x - 150 && mx <= x + 150 && my >= y - 400 && my <= y + 400 && mouseIsPressed) {
                selected = this;
            }
        },
        renderStats() {
            dashboard.innerHTML = `
            <h1>The ${name} Apartment Building</h1>
            <p>Residents: ${this.residents.length}</p>
            <p>Average Age: ${this.residents.map(({age}) => age).reduce((t, v) => t + v) / this.residents.length}</p>
            `

        }
    }
}
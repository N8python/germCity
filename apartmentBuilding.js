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
                stroke(150);
                strokeWeight(10);
            } else {
                noStroke();
            }
            rect(x, y, 300, 800, 60);
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
        cc() {
            const [mx, my] = getMouseCoords();
            if (mx >= x - 150 && mx <= x + 150 && my >= y - 400 && my <= y + 400 && mouseIsPressed) {
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
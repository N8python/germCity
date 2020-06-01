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
            if (color === "red") {
                fill(color);
            } else if (color === "blue") {
                fill(color);
            }
            rectMode(CENTER);
            if (selected === this) {
                drawBounds(x, y, size * 2, size * 2, {
                    strokeAmt: 5
                });
            }
            noStroke();
            rect(x, y, size, size, 10)
            if (color === "red") {
                fill(229, 50, 102);
                stroke(229, 50, 102);
            } else if (color === "blue") {
                fill(53, 155, 218);
                stroke(53, 155, 218);
            }
            strokeJoin(ROUND);
            strokeWeight(5);
            triangle(x - size / 1.75, y - size / 3, x + size / 1.75, y - size / 3, x, y - size);
            if (color === "red") {
                stroke(233, 124, 216);
            } else if (color === "blue") {
                stroke(111, 221, 251);
            }
            line(x - size / 2.5, y - size / 6, x - size / 2.5, y + size / 6);
            point(x - size / 2.5, y + size / 3)
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
let selected;

function getMouseCoords() {
    return [(mouseX * 1 / scaleVal) - tx, (mouseY * 1 / scaleVal) - ty]
}
function drawBounds(x, y, width, height, {
    strokeAmt = 10
} = {}) {
    stroke("teal");
    strokeWeight(strokeAmt);
    const extension = 3 + (sin(selectTick) + 1) / 4;
    line(x - width / 2, y - height / 2, x - width / extension, y - height / 2);
    line(x - width / 2, y - height / 2, x - width / 2, y - height / extension);
    line(x + width / 2, y - height / 2, x + width / extension, y - height / 2);
    line(x + width / 2, y - height / 2, x + width / 2, y - height / extension);
    line(x + width / 2, y + height / 2, x + width / extension, y + height / 2);
    line(x + width / 2, y + height / 2, x + width / 2, y + height / extension);
    line(x - width / 2, y + height / 2, x - width / extension, y + height / 2);
    line(x - width / 2, y + height / 2, x - width / 2, y + height / extension);
}
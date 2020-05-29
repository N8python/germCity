function Road({
    start,
    end
}) {
    return {
        draw() {
            stroke(50);
            strokeWeight(10)
            line(start.x, start.y, end.x, end.y);
            strokeWeight(1)
        },
        get start() {
            return start;
        },
        get end() {
            return end;
        }
    }
}
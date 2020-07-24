let _internalScare = 0;
const scare = {
    get level() {
        return 1 / (1 + Math.exp(-0.1 * (_internalScare - 50)))
    },
    updateScare(val) {
        _internalScare += val;
    }
}
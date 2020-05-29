const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

function ms(m) {
    const days = Math.floor(m / day);
    m %= day;
    const hours = Math.floor(m / hour);
    m %= hour;
    const minutes = Math.floor(m / minute);
    m %= minutes;
    const seconds = floor(random(0, 60));
    return `Day ${days + 1}, ${adjust(hours)}:${prependZero(minutes)}:${seconds !== seconds ? "00" : prependZero(seconds)} ${amPm(hours)}`
}

function getDay() {
    m = time;
    return Math.floor(m / day);
}

function getHour() {
    m = time;
    m %= day;
    return Math.floor(m / hour);
}

function amPm(hours) {
    if (hours < 11) {
        return "AM";
    }
    return "PM";
}

function prependZero(num) {
    if (num.toString().length === 1) {
        return "0" + num;
    }
    return num;
}

function adjust(hours) {
    if (hours % 12 === 0) {
        return "12";
    }
    return hours % 12
}
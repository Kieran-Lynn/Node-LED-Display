import LedMatrix from 'easybotics-rpi-rgb-led-matrix';

// LedMatrix (rows, cols, chainedDisplays, parallelDisplays, brightness, hardware-mapping, rgbSequence, cliFlags)
const matrix = new LedMatrix(32, 128, 1, 1, 100, 'adafruit-hat', 'RGB', [
    '--led-pwm-bits=1',
    '--led-show-refresh',
    '--led-pwm-dither-bits=2',
    '--led-slowdown-gpio=2',
    '--led-pwm-dither-bits=2',
]);

const font = `${__dirname}/fonts/9x18B.bdf`;

function getFormattedMinOrSeconds(time) {
    if (time < 10) {
        return `0${time}`;
    }
    return time;
}

function updateClock() {
    matrix.fill(0, 0, 0);
    matrix.update();
    const date = new Date();
    const currentHour = date.getHours();
    const currentMins = getFormattedMinOrSeconds(date.getMinutes());
    const currentSeconds = getFormattedMinOrSeconds(date.getSeconds());

    const currentTime = `${currentHour} : ${currentMins} : ${currentSeconds}`;

    matrix.drawText(10, 7, currentTime, font, 255, 0, 100);
    matrix.update();
}

setInterval(updateClock, 1000);

// eslint-disable-next-line no-bitwise
setInterval(() => {}, 1 << 30);

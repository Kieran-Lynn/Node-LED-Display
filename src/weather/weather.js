import LedMatrix from 'easybotics-rpi-rgb-led-matrix';
import axios from 'axios';
import path from 'path';

// TODO: use weatherconfig to get zip and apikey. Will probabyl have to convert build to rollup to do that

// LedMatrix (rows, cols, chainedDisplays, parallelDisplays, brightness, hardware-mapping, rgbSequence, cliFlags)
const matrix = new LedMatrix(32, 128, 1, 1, 100, 'adafruit-hat', 'RGB', [
    '--led-pwm-bits=1',
    '--led-show-refresh',
    '--led-pwm-dither-bits=2',
    '--led-slowdown-gpio=2',
    '--led-pwm-dither-bits=2',
]);

const smallFont = path.join(__dirname, '..', 'fonts', '7x13.bdf');

function getWeatherDataPromise() {
    return axios({
        url:
            'http://api.openweathermap.org/data/2.5/weather?zip=80220&&units=imperial&APPID=146c256a087c40880291650a75386da2',
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.data)
        .catch((err) => console.error(err));
}

getWeatherDataPromise().then((resp) => {
    const { main } = resp;
    const { temp } = main;
    matrix.drawText(15, 7, resp.name, smallFont, 255, 255, 0);
    matrix.drawText(80, 7, `${temp}`, smallFont, 0, 153, 255);
    matrix.update();
});

// eslint-disable-next-line no-bitwise
setInterval(() => {}, 1 << 30);

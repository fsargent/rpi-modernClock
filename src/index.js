var moment = require('moment-timezone');
require('dotenv').config();
var tz = process.env.TZ || 'America/Los_Angeles';
var decimalize = function (timeFrame) {
    var timeArray = (((moment().tz(tz) - moment().tz(tz).startOf(timeFrame)) /
        (moment().tz(tz).endOf(timeFrame) - moment().tz(tz).startOf(timeFrame))) *
        100000)
        .toPrecision(5)
        .split('');
    timeArray.splice(1, 0, ':');
    timeArray.splice(4, 0, ':');
    return timeArray.join('');
};
var duodecimalTime = function () {
    var now = moment().tz(tz);
    return now.format('h').replace('10', 'X').replace('11', 'E') + ":" + now.format('mm:ss') + now.format('p').replace('m', '');
};
var message = function () { return duodecimalTime() + "\n" + decimalize('day') + "%"; };
console.log("Started with:\n" + message());
if (process.env.BALENA) {
    var LCDPLATE = require('adafruit-i2c-lcd').plate;
    var lcd_1 = new LCDPLATE(1, 0x20);
    lcd_1.backlight(lcd_1.colors.BLUE);
    setInterval(function () {
        lcd_1.clear();
        lcd_1.message(message());
    }, 1000);
}

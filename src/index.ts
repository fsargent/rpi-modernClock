const moment = require('moment-timezone');
require('dotenv').config();

const tz = process.env.TZ || 'America/Los_Angeles';

const decimalize = (timeFrame: string): String => {
  // Prints the % completed of the timeframe requested. 'day','month','year' etc
  const timeArray = Math.trunc(
    ((moment().tz(tz) - moment().tz(tz).startOf(timeFrame)) /
      (moment().tz(tz).endOf(timeFrame) - moment().tz(tz).startOf(timeFrame))) *
    1000000
  ).toString().padStart(6, '0').split('');
  timeArray.splice(2, 0, ':');
  timeArray.splice(5, 0, ':');
  return timeArray.join('');
};

const duodecimalTime = (): String => {
  // Prints duodecimal time
  const now = moment().tz(tz);
  return [`${(now.hour() >= 12) ? '1' : '0'}`,
    `${now.format('h').replace('10', 'X').replace('11', 'E').replace('12', '0')}`,
    `:${now.format('mm:ss')}`].join('');
};

const message = () => {
  const line1 = [`${decimalize('day')}%`,
    `    `,
    `${moment().format('ddd')}`,
  ].join('');

  const line2 = [
    `${duodecimalTime()}`,

    `   `,
    `${moment().format('M')}m${moment().format('DD')}d`,
  ].join('');

  if (line1.toString().length != 16|| line2.toString().length != 16) {
    console.error(`line1: ${line1.toString().length}`);
    console.error(`line2: ${line2.toString().length}`);
  };

  return line1 + '\n' + line2;
};

console.log(`Started with:\n${message()}\n`);

if (process.env.BALENA) {
  const LCDPLATE = require('adafruit-i2c-lcd').plate;
  const lcd = new LCDPLATE(1, 0x20);
  lcd.backlight(lcd.colors.BLUE);

  setInterval(() => {
    lcd.clear();
    lcd.message(message());
  }, 1000);
}

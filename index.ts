const moment = require("moment-timezone");
require("dotenv").config();

const tz = process.env.TZ || "America/Los_Angeles";

const decimalize = (timeFrame: string): String => {
  let timeArray = (
    ((moment().tz(tz) - moment().tz(tz).startOf(timeFrame)) /
      (moment().tz(tz).endOf(timeFrame) - moment().tz(tz).startOf(timeFrame))) *
    100000
  )
    .toPrecision(5)
    .split("");
  timeArray.splice(1, 0, ":");
  timeArray.splice(4, 0, ":");
  return timeArray.join("");
};

const duodecimalTime = (): String => {
  const now = moment().tz(tz);
  return `${now.format("h").replace("10", "X").replace("11", "E")}:${now.format(
    "mm:ss"
  )}${now.format("p").replace("m", "")}`;
};

const message = () => `${duodecimalTime()}\n${decimalize("day")}%`;

console.log(`Started with:\n${message()}`);

if (process.env.BALENA) {
  const LCDPLATE = require("adafruit-i2c-lcd").plate;
  const lcd = new LCDPLATE(1, 0x20);
  lcd.backlight(lcd.colors.BLUE);

  setInterval(() => {
    lcd.clear();
    lcd.message(message());
  }, 1000);
}

const moment = require('moment')
require('dotenv').config()

const decimalDay = () => {
  return Number.parseFloat(
    (moment() - moment().startOf('day')) /
    (moment().endOf('day') - moment().startOf('day')) * 10
  ).toPrecision(5).toLocaleString()
}
const decimalMonth = () => {
  return Number.parseFloat(
    (moment() - moment().startOf('month')) /
    (moment().endOf('month') - moment().startOf('month'))
  ).toPrecision(7).toLocaleString('en-US', { style: 'percent' })
}

const decimalYear = () => {
  // 'how many seconds this year' / 'how many seconds in this year'
  return Number.parseFloat(
    (moment() - moment().startOf('year')) /
    (moment().endOf('year') - moment().startOf('year')) * 10
  ).toPrecision(8).toLocaleString()
}

if (process.env.LOCAL != true) {
  setInterval(() => {
    row1 = `${moment().format('h:mm:ss a')} Day: ${decimalDay()}`
    row2 = `Month: ${decimalMonth()} Year: ${decimalYear()}`
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0, 0);  // move cursor to beginning of line
    process.stdout.write(row1)
    process.stdout.cursorTo(0, 1);  // move cursor to beginning of line
    process.stdout.write(row2)
  }, 1000);
} else {
  const Lcd = require('lcd');
  const lcd = new Lcd({ rs: 25, e: 24, data: [23, 17, 21, 22], cols: 16, rows: 2 })

  lcd.on('ready', () => {
    setInterval(() => {
      row1 = `${moment().format('h:mm:ss a')} : ${decimalDay()}`
      row2 = `Month: ${decimalMonth()} Year: ${decimalYear()}`
      lcd.setCursor(0, 0);
      lcd.print(row1, (err) => {
        if (err) {
          throw err;
        }
        lcd.setCursor(0, 1);
        lcd.print(row2, (err) => {
          if (err) throw err;
        });
      });
    }, 1000);
  });

  process.on('SIGINT', () => {
    lcd.close();
    process.exit();
  });
}
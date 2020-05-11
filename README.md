# BaseClock

This is a clock for experimental time formats.
It shows:

- Duodecimal Time (12 hour clock except 10=X, 11=E)
- Decimal Time (% of day completed)

```
Mon   2020-05-11
X:12:52 4:25:60%
```

# Instructions

This uses Balena.io as a means of pushing the code. Setup instructions are in the DockerFile.

```bash
yarn
npm start # This should be all you need to show the local output.
balena push $PROJECTNAME
```

# Items

1x [Adafruit 16x2 LCD](https://www.adafruit.com/product/1110)
1x [Raspberry Pi](https://www.adafruit.com/category/105)

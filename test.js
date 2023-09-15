const ADB = require("./main.js")

const device = new ADB("fadsfd")


async function test() {
    console.log('1')
    await device.getADBDevices()
    console.log('2')
}

test()
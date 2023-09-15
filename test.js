const ADB = require("./main.js")

const device = new ADB("5554")


async function test() {
    // device.getADBDevices()
    const x =  await device.listApps()
        .then((res) => {
            if(res != null) {
                return res
            }
        })
        .catch((err) => {
            console.log("error with List")
        })

    console.log("xxxx", x)
}

test()

// const x = device.getADBDevices()
// console.log('c', x)

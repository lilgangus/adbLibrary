const fs = require('fs')
const ADB = require("./main.js")

const device = new ADB("5554")


async function test() {
    // device.getADBDevices()
    // const x =  await device.listApps()
    //     .then((res) => {
    //         if(res != null) {
    //             return res
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("error with List")
    //     })

    // console.log(x)

    // console.log('')

    // const app = await device.checkFor('mcdonalds.app')
    
    // console.log(app)
    

    const tes = await device.getScreenInfo()
    console.log("fdafsa", tes)
}

test()

// const x = device.getADBDevices()
// console.log('c', x)

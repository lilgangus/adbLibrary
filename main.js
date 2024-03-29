const { exec } = require('child_process')
const { resolve } = require('path')

class ADB {
    constructor(deviceId) {
        this.deviceId = deviceId
        this.specifyDevice = specifiedDeivce(deviceId)
    }


    // This function returns a promise with all the devices currently connected
    getADBDevices() {
        runTerminalCommand('devices')

    }

    // This function returns a promise with all the devices currently connected
    stopDevice() {
        runTerminalCommand(this.specifyDevice + 'emu kill')
    }

    // For this to run, ffmpeg/ffplay must be installed on the computer
    streamScreen(recordStream, recordTime) {

        runTerminalCommand(this.specifyDevice + 'shell screenrecord --output-format=h264 - | ffplay -framerate 30 -probesize 32 -sync video -')

        // hopefully we are stoping the command with kill()
        if (recordStream) {
            // const startRecording = runTerminalCommand(this.specifyDevice + 'shell screenrecord /sdcard/screenRecording.mp4')

            // setTimeout(() => {
            //     // stop the recording
            //     startRecording.kill()
            //     runTerminalCommand(this.specifyDevice + 'adb pull /sdcard/screenRecording.mp4')
            //     runTerminalCommand(this.specifyDevice + 'shell rm sdcard/screenRecording.mp4')
            // }, recordTime)

            recordScreen(recordTime)
        }
    }

    recordScreen(recordTime) {
            const startRecording = runTerminalCommand(this.specifyDevice + 'shell screenrecord /sdcard/screenRecording.mp4')

            setTimeout(() => {
                // stop the recording
                startRecording.kill()
                runTerminalCommand(this.specifyDevice + 'adb pull /sdcard/screenRecording.mp4')
                // delete the recording so we can recall the recording
                runTerminalCommand(this.specifyDevice + 'shell rm sdcard/screenRecording.mp4')
            }, recordTime)
    }

    takeScreenshot() {
        runTerminalCommand(this.specifyDevice + 'shell screencap -p /sdcard/screenshot.png')
        runTerminalCommand(this.specifyDevice + 'pull /sdcard/screenshot.png')

        // delete the photo
        runTerminalCommand(this.specifyDevice + 'shell rm /sdcard/screenshot.png')
    }

    // input commands

    tapScreen(x, y) {

        runTerminalCommand(this.specifyDevice + 'shell input tap ' + x + ' ' + y)
    }

    // duration is in ms
    swipe(xInitial, yInitial, xFinal, yFinal, duration) {
        runTerminalCommand(this.specifyDevice + 'shell input swipe ' + xInitial + ' ' + yInitial + ' ' + xFinal + ' ' + yFinal + ' '  + duration) 
    }

    type(text) {
        runTerminalCommand(this.specifyDevice + 'shell input text "' + text + '"')
    }

    homeButton() {
        runTerminalCommand(this.specifyDevice + 'shell input keyevent KEYCODE_HOME')
    }

    // get device info

    // when calling this, since we have a promise with an error, we need to make sure to use catch() to handle it
    // This function returns a promise with all the apps 
    listApps() {

        return new Promise((resolve, reject) => {
            exec('adb ' + this.specifyDevice + ' shell pm list packages', (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`error: ` + error)
                    console.log(`stderr: ` + stderr)
                    reject()
                } 
    
                if(stdout) {
                    const newStdout = stdout.replace(/package:com./g, '').split('\n')
                    resolve(newStdout)
                }

            })

    })

    }

    async checkFor(app) {
        const listOfApps = await this.listApps()
        if(listOfApps.includes(app)) {
            return true
        }
        return false
    }

    getScreenInfo() {
        
        return new Promise((resolve, reject) => {
            {
                exec('adb ' + this.specifyDevice + ' shell wm size', (error, stdout, stderr) =>  {
                    if(error || stderr) {
                        console.log(`error: ` + error)
                        console.log(`stderr: ` + stderr)
                        reject()
                    }
    
                    if(stdout) {
                        const newStdout = stdout.slice(15)
                        resolve(newStdout)
                    }
                })
            }
        })
    }

}

// Potentially add promises to this instead of just using a callback to prevent callback errors? 
function runTerminalCommand(command) {
    exec('adb ' + command, (error, stdout, stderr) => {
        if (error || stderr) {
            console.log(`error: ` + error)
            console.log(`stderr: ` + stderr)
            return;
        }

        if (stdout != null) {
            console.log('stdout: ')
            console.log(stdout)
        }
    })
}


function specifiedDeivce(deviceId) {
    if (deviceId != null) {
        return '-s emulator-' + deviceId.toString() + ' '
    }

    return ''
}

module.exports = ADB
const {
    exec
} = require('child_process')

class ADB {
    constructor(deviceId) {
        this.deviceId = deviceId
        this.specifyDevice = specifiedDeivce(deviceId)
    }


    getADBDevices() {
        // this runs the adb 'devices' command
        runTerminalCommand('devices')

    }

    stopDevice(deviceId) {
    
        runTerminalCommand(this.specifyDevice + 'emu kill')
    }

    // for this  to run, ffmpeg/ffplay must be installed on the computer
    streamScreen(deviceId, recordStream, recordTime) {

        runTerminalCommand(this.specifyDevice + 'shell screenrecord --output-format=h264 - | ffplay -framerate 30 -probesize 32 -sync video -')

        if (recordStream) {
            runTerminalCommand(this.specifyDevice + 'shell screenrecord /sdcard/screenRecording.mp4')

            setTimeout(() => {
                runTerminalCommand(this.specifyDevice + 'adb pull /sdcard/screenRecording.mp4')
                runTerminalCommand(this.specifyDevice + 'shell rm sdcard/screenRecording.mp4')
            }, recordTime)
        }
    }

    tapScreen(x, y, deviceId) {

        runTerminalCommand(this.specifyDevice + 'shell input tap ' + x + ' ' + y)
    }

    // duration is in ms
    swipe(xInitial, yInitial, xFinal, yFinal, duration) {

    }
}

// Potentially put this in a utils folder
// Potentiall add promises to this instead of just using a callback? Prevent callback hell?
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
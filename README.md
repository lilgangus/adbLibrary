# adbLibrary
 
This is a JS libary to control an android emulator thorugh the Android Debug Bridge (ADB). It wraps some adb ADB commands and provides a more user-friendly interface to control an emulator. 


# ADB JavaScript Library

This ADB JavaScript library provides a simplified and asynchronous interface to interact with Android devices via ADB (Android Debug Bridge). It allows for performing various actions such as listing devices, taking screenshots, recording the screen, input simulation (taps, swipes, typing), and more, programmatically through Node.js.

## Features

- **Device Management**: Connect to and manage multiple Android devices.
- **Screen Interaction**: Stream the device's screen, take screenshots, and record the screen.
- **Input Simulation**: Simulate tap, swipe, and typing actions on the device.
- **Application Management**: List installed applications and check for the presence of a specific app.
- **Device Information**: Retrieve screen resolution information.

## Installation

For screen streaming and recording, `ffmpeg`/`ffplay` must be installed.

To use the library in your project, add the `main.js` file to your project directory.

## Usage

First, require the ADB library in your Node.js script:

```js
const ADB = require('./ADB');
```

Then, create an instance of the ADB class:

```js
const device = new ADB(<DeviceNumber>);
```

## Functions

This section outlines the available functions in the ADB library.

# `getADBDevices()`

- **Description**: Returns a promise with all the devices currently connected.

# `stopDevice()`

- **Description**: Stops all active devices.

# `streamScreen()`

- **Description**: Streams the device's screen (uses ffmpeg/ffplay).

# `takeScreenshot()`

- **Description**: Takes a screenshot of the device's screen.

# `recordScreen()`

- **Description**: Records the device's screen, intially saved onto device, then pulled to computer.

# `takeScreenshot()`

- **Description**: Takes a screenshot of the device's screen, photo is deleted from device and only saved on host.

# `tapScreen(x, y)`

- **Description**: Simulates a tap on the device's screen at the specified coordinates.

# `swipe(xInitial, yInitial, xFinal, yFinal, duration)`

- **Description**: Simulates a swipe on the device's screen from the initial coordinates to the final coordinates over the specified duration.

# `type(text)`

- **Description**: Types the specified text on the device's screen.

# `listApps()`

- **Description**: Lists all installed applications on the device, formatting in a readable format, ignoring packages.


# `checkFor(app)`

- **Description**: Searches device for the specified app, returns true if found, false if not. Note: This is an async function, so it must be awaited.

# `getScreenInfo()`

- **Description**: Returns details about the devices screen. 

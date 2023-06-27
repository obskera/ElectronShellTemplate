const Store = require('electron-store');
// import * as Store from 'electron-store'
const storage = new Store()

function getWindowSettings() {
    const default_bounds = [800, 600]

    const size = storage.get("win-size")

    if (size) {
        return size
    } else {
        storage.set("win-size", default_bounds)
        return default_bounds
    }
}

function saveBounds(bounds) {
    storage.set('win-size', bounds)
    console.log("Bounds Saved: ", bounds)
}

function getCount() {
    const defaultCount = 0
    const currentCount = storage.get('count')

    if (currentCount) {
        return currentCount
    } else {
        storage.set('count', defaultCount)
        return defaultCount
    }
}

function setCount(count) {
    storage.set('count', count)
    console.log("count saved: ", count)
}

module.exports = {
    getWindowSettings: getWindowSettings,
    saveBounds: saveBounds,
    getCount: getCount,
    setCount: setCount
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPushwaveSettings = getPushwaveSettings;
const react_native_1 = require("react-native");
const fetch_1 = require("./fetch");
const pwLogger_1 = require("./pwLogger");
const pushwaveSettingsPromise = (async () => {
    try {
        return await (0, fetch_1.fetchApiGet)("pushwave-config", { platform: react_native_1.Platform.OS });
    }
    catch (e) {
        // log si besoin
        pwLogger_1.PWLogger.warn(`Unable to load PushWave configuration: ${e}`);
        return {};
    }
})();
function getPushwaveSettings() {
    return pushwaveSettingsPromise;
}

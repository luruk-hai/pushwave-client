"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndroidIntegrityToken = getAndroidIntegrityToken;
exports.getDeviceCheckToken = getDeviceCheckToken;
const react_native_1 = require("react-native");
const pushwaveSettings_1 = require("../utils/pushwaveSettings");
const MODULE_NAME = "PushwaveAttestation";
const NativeAttestation = react_native_1.NativeModules?.[MODULE_NAME];
function assertLinked() {
    if (!NativeAttestation) {
        throw new Error("native-module-unavailable");
    }
}
async function getAndroidIntegrityToken(nonce) {
    if (react_native_1.Platform.OS !== "android")
        return;
    const pushwaveSettings = await (0, pushwaveSettings_1.getPushwaveSettings)();
    const cloudProjectNumber = parseCloudProjectNumber(pushwaveSettings);
    assertLinked();
    return NativeAttestation.getIntegrityToken(nonce, cloudProjectNumber);
}
async function getDeviceCheckToken(nonce) {
    if (react_native_1.Platform.OS !== "ios")
        return;
    assertLinked();
    return NativeAttestation.getDeviceCheckToken(nonce);
}
function parseCloudProjectNumber(pushwaveSettings) {
    const projectNumber = typeof pushwaveSettings?.cloudProjectNumber === "string"
        ? Number(pushwaveSettings.cloudProjectNumber)
        : pushwaveSettings?.cloudProjectNumber;
    if (typeof projectNumber !== "number" || !Number.isFinite(projectNumber)) {
        throw new Error("Google Cloud Project Number missing.");
    }
    return projectNumber;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndroidIntegrityToken = getAndroidIntegrityToken;
exports.getDeviceCheckToken = getDeviceCheckToken;
const react_native_1 = require("react-native");
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
    assertLinked();
    return NativeAttestation.getIntegrityToken(nonce);
}
async function getDeviceCheckToken(nonce) {
    if (react_native_1.Platform.OS !== "ios")
        return;
    assertLinked();
    return NativeAttestation.getDeviceCheckToken(nonce);
}

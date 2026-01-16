"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationAttestation = getApplicationAttestation;
const buffer_1 = require("buffer");
const react_native_1 = require("react-native");
const native_1 = require("./native");
async function getApplicationAttestation() {
    const { nonce, timestamp } = createNonce();
    try {
        if (react_native_1.Platform.OS === "android")
            return await getAndroidSignature(nonce, timestamp);
        if (react_native_1.Platform.OS === "ios")
            return await getIosDeviceCheck(nonce, timestamp);
    }
    catch (err) {
        const reason = err?.message ?? "attestation-error";
        return { status: "disabled", reason };
    }
    return { status: "disabled", reason: "platform-unsupported" };
}
function createNonce() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2);
    const raw = `${timestamp}:${random}`;
    const nonce = base64UrlEncode(raw);
    return { nonce, timestamp };
}
function base64UrlEncode(input) {
    if (typeof globalThis.btoa === "function") {
        return globalThis.btoa(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return buffer_1.Buffer.from(input, "utf8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
async function getAndroidSignature(nonce, timestamp) {
    const integrityToken = await (0, native_1.getAndroidIntegrityToken)(nonce);
    if (!integrityToken) {
        return { status: "disabled", reason: "play-integrity-unavailable" };
    }
    return { status: "ok", platform: "android", nonce, timestamp, integrityToken };
}
async function getIosDeviceCheck(nonce, timestamp) {
    const deviceCheckToken = await (0, native_1.getDeviceCheckToken)(nonce);
    if (!deviceCheckToken) {
        return { status: "disabled", reason: "devicecheck-unavailable" };
    }
    return { status: "ok", platform: "ios", nonce, timestamp, deviceCheckToken };
}

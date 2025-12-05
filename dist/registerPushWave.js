"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerPushWave;
const fetch_1 = require("./utils/fetch");
const expoToken_1 = require("./utils/expoToken");
const getApplicationAttestation_1 = __importDefault(require("./attestation/getApplicationAttestation"));
const react_native_1 = require("react-native");
const pwLogger_1 = require("./utils/pwLogger");
const apiKeyCheck_1 = require("./utils/apiKeyCheck");
async function registerPushWave({ apiKey }) {
    if ((0, apiKeyCheck_1.isSecretKey)(apiKey)) {
        const warn = `\x1b[0m You are using your SECRET API key in a client environment. This key must NEVER be embedded in a mobile app.`;
        pwLogger_1.PWLogger.warn(warn);
    }
    const expoToken = await (0, expoToken_1.getExpoToken)();
    if (!expoToken) {
        const message = "could not get ExpoToken";
        pwLogger_1.PWLogger.error(message);
        return {
            success: false,
            message: "[PushWaveClient] Error: " + message
        };
    }
    const appAttestation = await (0, getApplicationAttestation_1.default)(apiKey);
    if (appAttestation.status === "disabled")
        pwLogger_1.PWLogger.warn(`(${react_native_1.Platform.OS}) could not get attestation: ${appAttestation.reason}`);
    const path = "/v1/expo-tokens";
    const options = {
        apiKey: apiKey,
        expoToken: expoToken,
        platform: react_native_1.Platform.OS,
        appAttestation: appAttestation
    };
    try {
        const res = await (0, fetch_1.fetchApi)(path, options);
        return {
            success: true,
            message: res.message,
        };
    }
    catch (err) {
        const e = err;
        pwLogger_1.PWLogger.error(e.message);
        return {
            success: false,
            message: e.message,
        };
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPushWave = registerPushWave;
const expoToken_1 = require("../utils/expoToken");
const react_native_1 = require("react-native");
const pwLogger_1 = require("../utils/pwLogger");
const apiKeyCheck_1 = require("../utils/apiKeyCheck");
const index_1 = require("../attestation/index");
const fetch_1 = require("../utils/fetch");
const installationId_1 = require("../utils/installationId");
const collectDeviceMetaData_1 = require("../utils/collectDeviceMetaData");
async function registerPushWave({ apiKey }) {
    const OS = react_native_1.Platform.OS;
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
    const appAttestation = await (0, index_1.getApplicationAttestation)(apiKey);
    if (appAttestation.status === "disabled")
        pwLogger_1.PWLogger.warn(`(${react_native_1.Platform.OS}) could not get attestation: ${appAttestation.reason}`);
    const path = "expo-tokens";
    const installationId = await (0, installationId_1.getInstallationId)();
    const { appVersion, buildNumber, countryCode, deviceModel, locale, osVersion, timezone } = (0, collectDeviceMetaData_1.collectDeviceMetaData)();
    const options = {
        apiKey: apiKey,
        expoToken: expoToken,
        platform: OS,
        appAttestation: appAttestation,
        environment: __DEV__ ? "development" : "production",
        installationId,
        appVersion,
        buildNumber,
        countryCode,
        deviceModel,
        locale,
        osVersion,
        timezone
    };
    try {
        const res = await (0, fetch_1.fetchApi)("PUT", path, { data: options });
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = logout;
const react_native_1 = require("react-native");
const attestation_1 = require("../attestation");
const register_1 = require("../register");
const installationId_1 = require("../utils/installationId");
const pwLogger_1 = require("../utils/pwLogger");
const fetch_1 = require("../utils/fetch");
const getApiKey_1 = require("../utils/getApiKey");
async function logout() {
    const response = { success: false };
    if (!register_1.IS_INITIALIZED) {
        pwLogger_1.PWLogger.warn("PushWaveClient.init({ apiKey }) must be called before PushWaveClient.logout");
        return response;
    }
    let apiKey;
    try {
        apiKey = await (0, getApiKey_1.getApiKey)();
    }
    catch (e) {
        pwLogger_1.PWLogger.warn("[LOGOUT]", e);
        return response;
    }
    const installationId = await (0, installationId_1.getInstallationId)();
    const appAttestation = await (0, attestation_1.getApplicationAttestation)();
    const data = {
        apiKey,
        installationId,
        appAttestation,
        environment: __DEV__ ? "development" : "production",
        platform: react_native_1.Platform.OS
    };
    try {
        const res = await (0, fetch_1.fetchApi)("POST", "app-installations/logout", { data });
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

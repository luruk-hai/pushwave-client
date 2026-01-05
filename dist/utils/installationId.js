"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstallationId = void 0;
const pwLogger_1 = require("./pwLogger");
const STORAGE_KEY = "pushwave-installation-id";
let cachedId = null;
let warnedMissingSecureStore = false;
const generateId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    // Fallback UUID-ish generator
    const bytes = new Uint8Array(16);
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
        crypto.getRandomValues(bytes);
    }
    else {
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
    }
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20)
    ].join("-");
};
const loadSecureStore = () => {
    try {
        return require("expo-secure-store");
    }
    catch (err) {
        return null;
    }
};
const getInstallationId = async () => {
    if (cachedId)
        return cachedId;
    const SecureStore = loadSecureStore();
    if (SecureStore) {
        try {
            const existing = await SecureStore.getItemAsync(STORAGE_KEY);
            if (existing) {
                cachedId = existing;
                return existing;
            }
        }
        catch (err) {
            pwLogger_1.PWLogger.warn("Failed reading installationId from SecureStore:", err);
        }
        const id = generateId();
        try {
            await SecureStore.setItemAsync(STORAGE_KEY, id);
        }
        catch (err) {
            pwLogger_1.PWLogger.warn("Failed persisting installationId to SecureStore:", err);
        }
        cachedId = id;
        return id;
    }
    if (!warnedMissingSecureStore) {
        warnedMissingSecureStore = true;
        pwLogger_1.PWLogger.warn("expo-secure-store not installed; installationId will not persist across app restarts. Install expo-secure-store for better targeting.");
    }
    // Non-persistent fallback
    cachedId = generateId();
    return cachedId;
};
exports.getInstallationId = getInstallationId;

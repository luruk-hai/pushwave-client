"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiKey = getApiKey;
const register_1 = require("../register");
const loadSecureStore_1 = require("./loadSecureStore");
async function getApiKey() {
    const SecureStore = (0, loadSecureStore_1.loadSecureStore)();
    const apiKey = SecureStore ? await SecureStore.getItemAsync(register_1.API_STORAGE_KEY) : register_1.CACHE_API_KEY;
    if (!apiKey)
        throw new Error("Unable to retrieve API key.");
    return apiKey;
}

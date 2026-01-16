"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSecureStore = void 0;
const loadSecureStore = () => {
    try {
        return require("expo-secure-store");
    }
    catch (err) {
        return null;
    }
};
exports.loadSecureStore = loadSecureStore;

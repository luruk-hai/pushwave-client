"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSecretKey = isSecretKey;
function isSecretKey(apiKey) {
    return apiKey.startsWith("pw_sec_");
}

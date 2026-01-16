"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./register");
const identify_1 = require("./identify");
const logout_1 = require("./logout");
const PushWaveClient = {
    init(options) {
        return (0, register_1.registerPushWave)(options);
    },
    identify(options) {
        return (0, identify_1.identify)(options);
    },
    logout() {
        return (0, logout_1.logout)();
    }
};
exports.default = PushWaveClient;

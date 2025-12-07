"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./register");
const PushWaveClient = {
    init(options) {
        return (0, register_1.registerPushWave)(options);
    },
};
exports.default = PushWaveClient;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerPushWave_1 = __importDefault(require("./registerPushWave"));
const PushWaveClient = {
    init(options) {
        return (0, registerPushWave_1.default)(options);
    },
};
exports.default = PushWaveClient;

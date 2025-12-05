"use strict";
// utils/pwLogger.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWLogger = void 0;
const COLORS = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    green: "\x1b[32m"
};
exports.PWLogger = {
    info: (...args) => {
        if (__DEV__) {
            console.log(`${COLORS.cyan}${COLORS.bold}[PushWave INFO]${COLORS.reset}`, ...args);
        }
    },
    warn: (...args) => {
        if (__DEV__) {
            console.warn(`${COLORS.yellow}${COLORS.bold}⚠️  [PushWave WARNING]${COLORS.reset}`, ...args);
        }
    },
    error: (...args) => {
        if (__DEV__) {
            console.error(`${COLORS.red}${COLORS.bold}❌  [PushWave ERROR]${COLORS.reset}`, ...args);
        }
    },
    success: (...args) => {
        if (__DEV__) {
            console.log(`${COLORS.green}${COLORS.bold}✔️  [PushWave]${COLORS.reset}`, ...args);
        }
    }
};

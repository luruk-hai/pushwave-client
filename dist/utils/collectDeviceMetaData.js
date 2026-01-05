"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectDeviceMetaData = void 0;
const react_native_1 = require("react-native");
const expo_constants_1 = __importDefault(require("expo-constants"));
const loadApplication = () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require("expo-application");
    }
    catch (err) {
        return null;
    }
};
const loadDevice = () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require("expo-device");
    }
    catch (err) {
        return null;
    }
};
const loadLocalization = () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require("expo-localization");
    }
    catch (err) {
        return null;
    }
};
const collectDeviceMetaData = () => {
    const application = loadApplication();
    const device = loadDevice();
    const localization = loadLocalization();
    const appVersion = application?.nativeApplicationVersion ??
        (expo_constants_1.default.expoConfig?.version ?? "");
    const buildNumber = application?.nativeBuildVersion ??
        (expo_constants_1.default.expoConfig?.ios?.buildNumber ??
            (expo_constants_1.default.expoConfig?.android?.versionCode
                ? String(expo_constants_1.default.expoConfig?.android?.versionCode)
                : ""));
    const deviceModel = device?.modelName ?? (expo_constants_1.default.deviceName ?? "");
    const osVersion = device?.osVersion ?? (react_native_1.Platform.Version ? String(react_native_1.Platform.Version) : "");
    const locales = localization?.getLocales?.() ?? [];
    const primaryLocale = locales[0];
    const locale = primaryLocale?.languageTag ??
        (typeof Intl !== "undefined"
            ? Intl.DateTimeFormat().resolvedOptions().locale
            : "");
    const countryCode = primaryLocale?.regionCode ??
        (() => {
            const parts = locale?.split?.("-") ?? [];
            return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
        })();
    const calendars = localization?.getCalendars?.() ?? [];
    const timezone = calendars[0]?.timeZone ??
        (typeof Intl !== "undefined"
            ? Intl.DateTimeFormat().resolvedOptions().timeZone ?? ""
            : "");
    return {
        appVersion: appVersion ?? "",
        buildNumber: buildNumber ?? "",
        countryCode: countryCode ?? "",
        deviceModel: deviceModel ?? "",
        locale: locale ?? "",
        osVersion: osVersion ?? "",
        timezone: timezone ?? ""
    };
};
exports.collectDeviceMetaData = collectDeviceMetaData;

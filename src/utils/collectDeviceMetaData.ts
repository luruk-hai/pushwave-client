import { Platform } from "react-native";
import Constants from "expo-constants";

export type DeviceMetaData = {
  appVersion: string;
  buildNumber: string;
  countryCode: string;
  deviceModel: string;
  locale: string;
  osVersion: string;
  timezone: string;
};

type ApplicationModule = {
  nativeApplicationVersion?: string | null;
  nativeBuildVersion?: string | null;
};

type DeviceModule = {
  modelName?: string | null;
  osVersion?: string | null;
};

type LocalizationModule = {
  getLocales?: () => Array<{
    languageTag?: string;
    regionCode?: string;
  }>;
  getCalendars?: () => Array<{
    timeZone?: string;
  }>;
};

const loadApplication = (): ApplicationModule | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("expo-application") as ApplicationModule;
  } catch (err) {
    return null;
  }
};

const loadDevice = (): DeviceModule | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("expo-device") as DeviceModule;
  } catch (err) {
    return null;
  }
};

const loadLocalization = (): LocalizationModule | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("expo-localization") as LocalizationModule;
  } catch (err) {
    return null;
  }
};

export const collectDeviceMetaData = (): DeviceMetaData => {
  const application = loadApplication();
  const device = loadDevice();
  const localization = loadLocalization();

  const appVersion =
    application?.nativeApplicationVersion ??
    (Constants.expoConfig?.version ?? "");

  const buildNumber =
    application?.nativeBuildVersion ??
    (Constants.expoConfig?.ios?.buildNumber ??
      (Constants.expoConfig?.android?.versionCode
        ? String(Constants.expoConfig?.android?.versionCode)
        : ""));

  const deviceModel = device?.modelName ?? (Constants.deviceName ?? "");
  const osVersion = device?.osVersion ?? (Platform.Version ? String(Platform.Version) : "");

  const locales = localization?.getLocales?.() ?? [];
  const primaryLocale = locales[0];
  const locale =
    primaryLocale?.languageTag ??
    (typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().locale
      : "");

  const countryCode =
    primaryLocale?.regionCode ??
    (() => {
      const parts = locale?.split?.("-") ?? [];
      return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
    })();

  const calendars = localization?.getCalendars?.() ?? [];
  const timezone =
    calendars[0]?.timeZone ??
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

export type DeviceMetaData = {
    appVersion: string;
    buildNumber: string;
    countryCode: string;
    deviceModel: string;
    locale: string;
    osVersion: string;
    timezone: string;
};
export declare const collectDeviceMetaData: () => DeviceMetaData;

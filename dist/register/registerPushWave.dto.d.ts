export interface RegisterPushWaveClient {
    apiKey: string;
}
export interface RegisterPushWaveResponse {
    success: boolean;
    message?: string;
}
export interface RegisterPushWaveDTO {
    apiKey: string;
    expoToken: string;
    platform: string;
    appAttestation?: any;
    environment: "development" | "production";
    appVersion: string;
    buildNumber: string;
    installationId: string;
    osVersion: string;
    deviceModel: string;
    locale: string;
    timezone: string;
    countryCode: string;
}

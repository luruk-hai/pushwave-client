import { getExpoToken } from "../utils/expoToken";
import { Platform } from "react-native";
import { PWLogger } from "../utils/pwLogger";
import { isSecretKey } from "../utils/apiKeyCheck";
import { RegisterPushWaveClient, RegisterPushWaveDTO, RegisterPushWaveResponse } from "./registerPushWave.dto";
import { getApplicationAttestation } from "../attestation/index";
import { fetchApi } from "../utils/fetch";
import { getInstallationId } from "../utils/installationId";
import { collectDeviceMetaData } from "../utils/collectDeviceMetaData";
import { loadSecureStore } from "../utils/loadSecureStore";

export var IS_INITIALIZED: boolean = false;

export const API_STORAGE_KEY = "pushwave-api-storage-key";
export var CACHE_API_KEY: string | false = false;

/**
 * Initialize PushWave for this installation: retrieves the Expo push token, collects
 * attestation + device metadata, persists the API key when SecureStore is available,
 * and caches initialization state for subsequent calls.
 */
export async function registerPushWave(
    { apiKey }: RegisterPushWaveClient
): Promise<RegisterPushWaveResponse> {
    const OS = Platform.OS;

    if (isSecretKey(apiKey)) {
        const warn = `\x1b[0m You are using your SECRET API key in a client environment. This key must NEVER be embedded in a mobile app.`;
        PWLogger.warn(warn);
    }

    const expoToken = await getExpoToken();

    if (!expoToken) {

        const message = "could not get ExpoToken";

        PWLogger.error(message)

        return {
            success: false,
            message: "[PushWaveClient] Error: " + message
        }
    }

    const appAttestation = await getApplicationAttestation();

    if (appAttestation.status === "disabled")
        PWLogger.warn(`(${Platform.OS}) could not get attestation: ${appAttestation.reason}`);

    const path = "expo-tokens"

    const installationId = await getInstallationId();

    const { appVersion, buildNumber, countryCode, deviceModel, locale, osVersion, timezone } = collectDeviceMetaData();

    const options: RegisterPushWaveDTO = {
        apiKey: apiKey,
        expoToken: expoToken,
        platform: OS,
        appAttestation: appAttestation,
        environment: __DEV__ ? "development" : "production",
        installationId,
        appVersion,
        buildNumber,
        countryCode,
        deviceModel,
        locale,
        osVersion,
        timezone
    }

    const SecureStore = loadSecureStore();

    try {
        const res: RegisterPushWaveResponse = await fetchApi("PUT", path, { data: options })

        CACHE_API_KEY = apiKey;
        if (SecureStore) await SecureStore.setItemAsync(API_STORAGE_KEY, apiKey);

        IS_INITIALIZED = true;

        return {
            success: true,
            message: res.message,
        };
    } catch (err) {
        const e = err as Error;

        CACHE_API_KEY = false;
        if (SecureStore) await SecureStore.deleteItemAsync(API_STORAGE_KEY);

        IS_INITIALIZED = false;

        PWLogger.error(e.message);

        return {
            success: false,
            message: e.message,
        };
    }
}

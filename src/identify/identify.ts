import { Platform } from "react-native";
import { getApplicationAttestation } from "../attestation";
import { API_STORAGE_KEY, CACHE_API_KEY, IS_INITIALIZED } from "../register";
import { fetchApi } from "../utils/fetch";
import { loadSecureStore } from "../utils/loadSecureStore";
import { PWLogger } from "../utils/pwLogger";
import { IdentifyDTO, IdentifyOptions, IdentifyResponse } from "./identify.dto";
import { getInstallationId } from "../utils/installationId";
import { getApiKey } from "../utils/getApiKey";

export async function identify({ userId }: IdentifyOptions): Promise<IdentifyResponse> {

    const response: IdentifyResponse = { success: false }

    if (!IS_INITIALIZED) {

        PWLogger.warn("PushWaveClient.init({ apiKey }) must be called before PushWaveClient.identify");

        return response;
    }

    let apiKey;

    try {
        apiKey = await getApiKey();
    } catch (e) {
        PWLogger.warn("[IDENTIFY]", e);
        return response;
    }

    const installationId = await getInstallationId();
    const appAttestation = await getApplicationAttestation();

    const data: IdentifyDTO = {
        apiKey,
        userId,
        installationId,
        appAttestation,
        environment: __DEV__ ? "development" : "production",
        platform: Platform.OS
    }

    try {
        const res: IdentifyResponse = await fetchApi("PUT", "app-users", { data })
        return {
            success: true,
            message: res.message,
        };
    } catch (err) {
        const e = err as Error;

        PWLogger.error(e.message);

        return {
            success: false,
            message: e.message,
        };
    }
}
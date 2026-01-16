import { Platform } from "react-native";
import { getApplicationAttestation } from "../attestation";
import { IS_INITIALIZED } from "../register";
import { getInstallationId } from "../utils/installationId";
import { PWLogger } from "../utils/pwLogger";
import { LogoutDTO, LogoutResponse } from "./logout.dto";
import { fetchApi } from "../utils/fetch";
import { getApiKey } from "../utils/getApiKey";

export async function logout(): Promise<LogoutResponse> {
    const response: LogoutResponse = { success: false }

    if (!IS_INITIALIZED) {

        PWLogger.warn("PushWaveClient.init({ apiKey }) must be called before PushWaveClient.logout");

        return response;
    }

    let apiKey;

    try {
        apiKey = await getApiKey();
    } catch (e) {
        PWLogger.warn("[LOGOUT]", e);
        return response;
    }

    const installationId = await getInstallationId();
    const appAttestation = await getApplicationAttestation();

    const data: LogoutDTO = {
        apiKey,
        installationId,
        appAttestation,
        environment: __DEV__ ? "development" : "production",
        platform: Platform.OS
    }

    try {
        const res: LogoutResponse = await fetchApi("POST", "app-installations/logout", { data })
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
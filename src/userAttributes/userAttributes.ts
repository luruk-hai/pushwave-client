import { Platform } from "react-native";
import { getApplicationAttestation } from "../attestation";
import { IS_INITIALIZED } from "../register";
import { getApiKey } from "../utils/getApiKey";
import { getInstallationId } from "../utils/installationId";
import { PWLogger } from "../utils/pwLogger";
import { SetUserAttributes, SetUserAttributesDTO, SetUserAttributesResponse } from "./userAttributes.dto";
import { fetchApi } from "../utils/fetch";

export async function setUserAttributes(attributes: SetUserAttributes): Promise<SetUserAttributesResponse> {
    const response: SetUserAttributesResponse = { success: false }

    if (!IS_INITIALIZED) {

        PWLogger.warn("PushWaveClient.init({ apiKey }) must be called before PushWaveClient.logout");

        return response;
    }

    let apiKey;

    try {
        apiKey = await getApiKey();
    } catch (e) {
        PWLogger.warn("[PushWave.setUserAttributes]", e);
        return response;
    }

    const installationId = await getInstallationId();
    const appAttestation = await getApplicationAttestation();

    const data: SetUserAttributesDTO = {
        apiKey,
        installationId,
        appAttestation,
        environment: __DEV__ ? "development" : "production",
        platform: Platform.OS,
        attributes
    }

    try {
        const res: SetUserAttributesResponse = await fetchApi("PATCH", "app-users/me/attributes", { data })
        return {
            success: true,
            message: res.message,
            mismatches: res.mismatches
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
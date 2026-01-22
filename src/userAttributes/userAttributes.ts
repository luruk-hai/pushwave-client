import { Platform } from "react-native";
import { getApplicationAttestation } from "../attestation";
import { IS_INITIALIZED } from "../register";
import { getApiKey } from "../utils/getApiKey";
import { getInstallationId } from "../utils/installationId";
import { PWLogger } from "../utils/pwLogger";
import { GetUserAttributesDTO, GetUserAttributesResponse, SetUserAttributes, SetUserAttributesDTO, SetUserAttributesResponse } from "./userAttributes.dto";
import { fetchApi } from "../utils/fetch";

/**
 * Set custom attributes for the current user/installation. Requires a successful init.
 */
export async function setUserAttributes(attributes: SetUserAttributes): Promise<SetUserAttributesResponse> {
    const response: SetUserAttributesResponse = { success: false }

    if (!IS_INITIALIZED) {

        PWLogger.warn("PushWaveClient.init({ apiKey }) must be called before PushWaveClient.setUserAttributes");

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

/**
 * Retrieve attributes for the current user/installation. Requires a successful init.
 */
export async function getUserAttributes(): Promise<GetUserAttributesResponse> {
    if (!IS_INITIALIZED) {
        const msg = `PushWaveClient.init({ apiKey }) must be called before PushWaveClient.getUserAttributes`
        PWLogger.warn(msg);
        throw new Error(msg);
    }

    let apiKey;

    try {
        apiKey = await getApiKey();
    } catch (e) {
        const msg = `[PushWave.getUserAttributes] ${e}`
        PWLogger.warn(msg);
        throw new Error(msg);
    }

    const installationId = await getInstallationId();
    const appAttestation = await getApplicationAttestation();

    const data: GetUserAttributesDTO = {
        apiKey,
        installationId,
        appAttestation,
        environment: __DEV__ ? "development" : "production",
        platform: Platform.OS
    }

    try {
        const res: { attributes: GetUserAttributesResponse } = await fetchApi("POST", "app-users/me/attributes", { data })
        return res.attributes ?? {};
    } catch (err) {
        const e = err as Error;
        const msg = e.message;
        PWLogger.error(msg);
        throw new Error(msg);
    }
}

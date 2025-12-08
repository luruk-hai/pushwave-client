import { fetchApiPost, fetchApiGet } from "../utils/fetch";
import { getExpoToken } from "../utils/expoToken";
import { Platform } from "react-native";
import { PWLogger } from "../utils/pwLogger";
import { isSecretKey } from "../utils/apiKeyCheck";
import { RegisterPushWaveClient, RegisterPushWaveDTO, RegisterPushWaveResponse } from "./registerPushWave.dto";
import { getApplicationAttestation } from "../attestation/index";
import { platform } from "os";

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

    const appAttestation = await getApplicationAttestation(apiKey);

    if (appAttestation.status === "disabled")
        PWLogger.warn(`(${Platform.OS}) could not get attestation: ${appAttestation.reason}`);

    const path = "expo-tokens"

    const options: RegisterPushWaveDTO = {
        apiKey: apiKey,
        expoToken: expoToken,
        platform: OS,
        appAttestation: appAttestation,
        environment: __DEV__ ? "development" : "production"
    }

    try {
        const res: RegisterPushWaveResponse = await fetchApiPost(path, options)

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

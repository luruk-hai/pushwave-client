import { Platform } from "react-native";
import { fetchApiGet } from "./fetch";
import { PWLogger } from "./pwLogger";

type PushwaveSettings = Record<string, unknown>;

const pushwaveSettingsPromise: Promise<PushwaveSettings> = (async () => {
    try {
        return await fetchApiGet("pushwave-config", { platform: Platform.OS });
    } catch (e) {
        // log si besoin
        PWLogger.warn(`Unable to load PushWave configuration: ${e}`)
        return {}
    }
})();

export function getPushwaveSettings() {
    return pushwaveSettingsPromise;
}
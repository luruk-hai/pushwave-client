import { Platform } from "react-native";
import { fetchApi } from "./fetch";
import { PWLogger } from "./pwLogger";

export type PushwaveSettings = {
    cloudProjectNumber?: string | number;
    [key: string]: unknown;
};

const pushwaveSettingsPromise: Promise<PushwaveSettings> = (async () => {
    try {
        return await fetchApi("GET", "pushwave-config", { params: { platform: Platform.OS } });
    } catch (e) {
        // log si besoin
        PWLogger.warn(`Unable to load PushWave configuration: ${e}`)
        return {}
    }
})();

export function getPushwaveSettings() {
    return pushwaveSettingsPromise;
}

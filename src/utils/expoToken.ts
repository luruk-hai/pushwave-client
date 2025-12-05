import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function getExpoToken() {
    try {
        const existing = await Notifications.getPermissionsAsync();
        const finalStatus =
            existing.status === "granted"
                ? existing.status
                : (await Notifications.requestPermissionsAsync()).status;
        if (finalStatus !== "granted") return;

        const projectId =
            Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

        const token = (
            projectId
                ? await Notifications.getExpoPushTokenAsync({ projectId })
                : await Notifications.getExpoPushTokenAsync()
        ).data;

        return token;
    } catch (e) {
        throw new Error(`[expo-notifications] Error: ` + e);
    }
}
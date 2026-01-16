import { API_STORAGE_KEY, CACHE_API_KEY } from "../register";
import { loadSecureStore } from "./loadSecureStore";

export async function getApiKey(): Promise<string> {
    const SecureStore = loadSecureStore();

    const apiKey = SecureStore ? await SecureStore.getItemAsync(API_STORAGE_KEY) : CACHE_API_KEY;

    if (!apiKey) throw new Error("Unable to retrieve API key.")

    return apiKey;
}
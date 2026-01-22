import { RegisterPushWaveClient, RegisterPushWaveResponse } from "./registerPushWave.dto";
export declare var IS_INITIALIZED: boolean;
export declare const API_STORAGE_KEY = "pushwave-api-storage-key";
export declare var CACHE_API_KEY: string | false;
/**
 * Initialize PushWave for this installation: retrieves the Expo push token, collects
 * attestation + device metadata, persists the API key when SecureStore is available,
 * and caches initialization state for subsequent calls.
 */
export declare function registerPushWave({ apiKey }: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;

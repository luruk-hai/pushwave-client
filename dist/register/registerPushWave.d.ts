import { RegisterPushWaveClient, RegisterPushWaveResponse } from "./registerPushWave.dto";
export declare var IS_INITIALIZED: boolean;
export declare const API_STORAGE_KEY = "pushwave-api-storage-key";
export declare var CACHE_API_KEY: string | false;
export declare function registerPushWave({ apiKey }: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;

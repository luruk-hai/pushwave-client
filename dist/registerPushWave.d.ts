export interface RegisterPushWaveClient {
    apiKey: string;
}
export interface RegisterPushWaveResponse {
    success: boolean;
    message?: string;
}
export interface RegisterPushWaveOptions {
    apiKey: string;
    expoToken: string;
    platform: string;
    appAttestation?: any;
}
export default function registerPushWave({ apiKey }: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;

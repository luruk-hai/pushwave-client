export function isSecretKey(apiKey: string) {
    return apiKey.startsWith("pw_sec_");
}
export type LogoutResponse = {
    success: boolean;
    message?: string;
}

export type LogoutDTO = {
    apiKey: string;
    installationId: string;
    platform: string;
    appAttestation?: any;
    environment: "development" | "production",
}
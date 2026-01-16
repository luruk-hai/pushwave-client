export type IdentifyResponse = {
    success: boolean;
    message?: string;
}

export type IdentifyOptions = {
    userId: string;
}

export type IdentifyDTO = {
    userId: string;
    apiKey: string;
    installationId: string;
    platform: string;
    appAttestation?: any;
    environment: "development" | "production",
}
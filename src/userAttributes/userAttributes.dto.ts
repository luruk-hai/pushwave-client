export type AttributeValue =
    | string
    | number
    | boolean
    | Date
    | null

export type SetUserAttributes = Record<string, AttributeValue>

export type SetUserAttributesResponse = {
    success: boolean;
    message?: string;
    mismatches?: string;
}

export type SetUserAttributesDTO = {
    apiKey: string;
    installationId: string;
    platform: string;
    appAttestation?: any;
    environment: "development" | "production",
    attributes: SetUserAttributes
}
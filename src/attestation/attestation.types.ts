export interface AndroidAttestationPayload {
    status: "ok";
    platform: "android";
    nonce: string;
    timestamp: number;
    integrityToken: string;
}

export interface IosAttestationPayload {
    status: "ok";
    platform: "ios";
    nonce: string;
    timestamp: number;
    deviceCheckToken: string;
}

export interface DisabledAttestation {
    status: "disabled";
    reason: string;
}

export interface SkippedAttestation {
    status: "skipped";
}

export type ApplicationAttestation =
    | AndroidAttestationPayload
    | IosAttestationPayload
    | DisabledAttestation
    | SkippedAttestation;
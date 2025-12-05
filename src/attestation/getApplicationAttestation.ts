import { Buffer } from "buffer";
import { Platform } from "react-native";
import { getAndroidIntegrityToken, getDeviceCheckToken } from "./native";

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

export default async function getApplicationAttestation(apiKey: string): Promise<ApplicationAttestation> {
    if (!requiresAttestation(apiKey)) return { status: "skipped" };

    const { nonce, timestamp } = createNonce();

    try {
        if (Platform.OS === "android") return await getAndroidSignature(nonce, timestamp);
        if (Platform.OS === "ios") return await getIosDeviceCheck(nonce, timestamp);
    } catch (err) {
        const reason = (err as Error)?.message ?? "attestation-error";
        return { status: "disabled", reason };
    }

    return { status: "disabled", reason: "platform-unsupported" };
}

function requiresAttestation(apiKey: string) {
    return apiKey.startsWith("pw_pub_");
}

function createNonce() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2);
    const raw = `${timestamp}:${random}`;
    const nonce = base64UrlEncode(raw);
    return { nonce, timestamp };
}

function base64UrlEncode(input: string): string {
    if (typeof globalThis.btoa === "function") {
        return globalThis.btoa(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    return Buffer.from(input, "utf8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function getAndroidSignature(
    nonce: string,
    timestamp: number
): Promise<AndroidAttestationPayload | DisabledAttestation> {
    const integrityToken = await getAndroidIntegrityToken(nonce);

    if (!integrityToken) {
        return { status: "disabled", reason: "play-integrity-unavailable" };
    }

    return { status: "ok", platform: "android", nonce, timestamp, integrityToken };
}

async function getIosDeviceCheck(
    nonce: string,
    timestamp: number
): Promise<IosAttestationPayload | DisabledAttestation> {
    const deviceCheckToken = await getDeviceCheckToken(nonce);

    if (!deviceCheckToken) {
        return { status: "disabled", reason: "devicecheck-unavailable" };
    }

    return { status: "ok", platform: "ios", nonce, timestamp, deviceCheckToken };
}

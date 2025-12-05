import { NativeModules, Platform } from "react-native";

const MODULE_NAME = "PushwaveAttestation";
const NativeAttestation = NativeModules?.[MODULE_NAME];

function assertLinked() {
  if (!NativeAttestation) {
    throw new Error("native-module-unavailable");
  }
}

export async function getAndroidIntegrityToken(nonce: string): Promise<string | undefined> {
  if (Platform.OS !== "android") return;
  assertLinked();
  return NativeAttestation.getIntegrityToken(nonce);
}

export async function getDeviceCheckToken(nonce: string): Promise<string | undefined> {
  if (Platform.OS !== "ios") return;
  assertLinked();
  return NativeAttestation.getDeviceCheckToken(nonce);
}

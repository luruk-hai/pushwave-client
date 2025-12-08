import { NativeModules, Platform } from "react-native";
import { getPushwaveSettings, PushwaveSettings } from "../utils/pushwaveSettings";

const MODULE_NAME = "PushwaveAttestation";
const NativeAttestation = NativeModules?.[MODULE_NAME];

function assertLinked() {
  if (!NativeAttestation) {
    throw new Error("native-module-unavailable");
  }
}

export async function getAndroidIntegrityToken(nonce: string): Promise<string | undefined> {
  if (Platform.OS !== "android") return;

  const pushwaveSettings = await getPushwaveSettings();

  const cloudProjectNumber = parseCloudProjectNumber(pushwaveSettings);

  assertLinked();
  return NativeAttestation.getIntegrityToken(nonce, cloudProjectNumber);
}

export async function getDeviceCheckToken(nonce: string): Promise<string | undefined> {
  if (Platform.OS !== "ios") return;
  assertLinked();
  return NativeAttestation.getDeviceCheckToken(nonce);
}

function parseCloudProjectNumber(pushwaveSettings: PushwaveSettings): number {
  const projectNumber =
    typeof pushwaveSettings?.cloudProjectNumber === "string"
      ? Number(pushwaveSettings.cloudProjectNumber)
      : pushwaveSettings?.cloudProjectNumber;

  if (typeof projectNumber !== "number" || !Number.isFinite(projectNumber)) {
    throw new Error("Google Cloud Project Number missing.");
  }

  return projectNumber;
}

# pushwave-client (alpha)

Expo/React Native SDK for the upcoming PushWave SaaS (work in progress). Goal: fetch the Expo push token and prepare app attestation (Android Play Integrity / iOS DeviceCheck) to secure notification delivery. The SaaS/backend validation is coming soon—consider this an early-stage project.

---

## Quick install

1) Install the [SDK](https://www.npmjs.com/package/pushwave-client) and [Expo notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) (peer requirement):
```bash
npm install pushwave-client
npx expo install expo-notifications
```

2) Add the config plugin to your app.json / app.config.*:
```json
{
  "expo": {
    "plugins": ["pushwave-client"]
  }
}
```

3) Build native (EAS or dev client). Expo Go is not supported once native code is involved:
```bash
eas build -p android --profile development
eas build -p ios --profile development
```

---

## Minimal usage

```tsx
import { useEffect } from "react";
import { Alert } from "react-native";
import PushWaveClient from "pushwave-client";

export default function App() {
  useEffect(() => {
    (async () => {
      const res = await PushWaveClient.init({ apiKey: "pw_dev_xxx" });
      if (!res.success) {
        Alert.alert("PushWave", res.message ?? "Init failed");
      }
    })();
  }, []);

  return /* …your UI… */;
}
```

- `PushWaveClient.init` is async and returns `{ success: boolean; message?: string }`.
- Call it **once** at app startup (e.g., in `App.tsx` or a root component `useEffect`). Recalling it later is unnecessary.
- In `__DEV__`, the SDK may log additional info/errors (e.g., failed API calls) to help debugging.

---

## Notifications (expo-notifications)

- The SDK retrieves the user’s Expo push token. If the user denies notification permission, no push will be delivered and the token may not be available depending on platform/permission.
- On iOS, user permission is required to obtain a push token.
- On Android, Expo handles permission/channel setup; if the user refuses, no push is delivered.

---

## Attestation (current status)

- Backend validation is not live yet; it will arrive with the PushWave SaaS.
- Android (Play Integrity): will require a build distributed via the Play Store (internal/closed track) with Play App Signing + Play Integrity API enabled. No support for Expo Go / sideload.
- iOS (DeviceCheck): will require a real build (dev client or TestFlight), not Expo Go.
- For now, consider attestation non-blocking (the SDK may return a `disabled` flag until the SaaS is active).

---

## Compatibility

- Tested on the latest Expo SDK (54). No guarantees on earlier versions.
- Requires a native build (EAS or dev client).

---

## Links

- NPM: https://www.npmjs.com/package/pushwave-client
- GitHub: https://github.com/luruk-hai/pushwave-client#readme

---

## Roadmap (with SaaS)

- Server-side validation of Play Integrity / DeviceCheck tokens.
- Full attestation docs and Play Store setup (enable Integrity API, internal track).
- Complete registration flow with the PushWave backend.

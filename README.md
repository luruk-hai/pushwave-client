![PushWave flow](docs/assets/flow.png)
# pushwave-client (alpha)

PushWave is a lightweight Expo-first SDK to get push notifications running without building your own backend or wrestling with native setup. It fetches the Expo push token and prepares app attestation (Android Play Integrity / iOS DeviceCheck) so you can secure delivery. The SaaS dashboard is now live at https://pushwave.dev/ in to create audiences, templates, and scheduled sends. **Consider this an early-stage project**.

---

## Why PushWave?

- **No backend needed**: token storage, targeting logic, scheduling, and sending are all handled by PushWave’s cloud. Forget cron jobs and custom endpoints.
- **Expo-first design**: auto-linking, config plugin, no manual Gradle/Pod edits. Works seamlessly with EAS Build and Expo Dev Clients. Compatible with Expo Router.
- **Native attestation**: Play Integrity on Android + DeviceCheck on iOS to reduce spoofed APKs, fake tokens, and leaked API keys. Server-side validation is live.
- **One-line setup**: `PushWaveClient.init({ apiKey })` retrieves the Expo token, performs attestation when required, and logs enhanced debug info under `__DEV__`.
- **Dashboard-first workflow**: audiences, groups, segments, templates, one-off or recurring pushes without touching Firebase or APNs directly (available at https://pushwave.dev/).
- **Minimal external config**: for Android you still upload your FCM credentials to Expo (required by the platform), but PushWave handles the rest.

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

## Dashboard

- The PushWave dashboard is live: go to https://pushwave.dev/ and log in to manage audiences, templates, one-off sends, and scheduled campaigns.
- The SDK handles token collection and attaches attestation data so your dashboard campaigns can target real devices.

---

## Notifications (expo-notifications)

- The SDK retrieves the user’s Expo push token. If the user denies notification permission, no push will be delivered and the token may not be available depending on platform/permission.
- On iOS, user permission is required to obtain a push token.
- On Android, Expo handles permission/channel setup; if the user refuses, no push is delivered.
- You still need to provide FCM credentials to Expo for Android push (standard Expo requirement).

---

## Attestation

- Backend validation is live: integrity tokens are checked server-side when attestation is enabled for your project.
- Android (Play Integrity): requires a build distributed via the Play Store (internal/closed track) with Play App Signing + Play Integrity API enabled. No support for Expo Go / sideload.
- iOS (DeviceCheck): requires a real build (dev client or TestFlight), not Expo Go.
- Attestation can be toggled per project in the dashboard; if off, the SDK may return a `disabled` flag.

---

## Compatibility

- Tested on the latest Expo SDK (54). No guarantees on earlier versions.
- Requires a native build (EAS or dev client).

---

## Links

- DASHBOARD https://pushwave.dev/
- DOCS: https://docs.pushwave.dev/
- NPM: https://www.npmjs.com/package/pushwave-client
- GitHub: https://github.com/luruk-hai/pushwave-client#readme

---

*Roadmap is no longer tracked in this README; check the dashboard or docs for current feature status.*
import { registerPushWave, RegisterPushWaveClient, RegisterPushWaveResponse } from "./register";
import { identify, IdentifyOptions, IdentifyResponse } from "./identify";
import { LogoutResponse, logout } from "./logout";
import { getUserAttributes, GetUserAttributesDTO, GetUserAttributesResponse, setUserAttributes, SetUserAttributes, SetUserAttributesResponse } from "./userAttributes";

export interface PushWaveClientType {
  /**
   * Initialize PushWave for this installation. Must be called once at app startup.
   * - Requests push permissions + Expo push token.
   * - Collects device/app metadata and attestation.
   * - Caches the API key (SecureStore when available) and marks the client initialized.
   */
  init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;

  /**
   * Attach a userId to the current installation for targeting/analytics.
   * Requires `init` to have run successfully in this session.
   */
  identify(options: IdentifyOptions): Promise<IdentifyResponse>;

  /**
   * Unlink the current installation from the backend (e.g., on logout).
   * Requires `init` to have run successfully in this session.
   */
  logout(): Promise<LogoutResponse>;

  /**
   * Set custom attributes for the current user/installation.
   * Requires `init` to have run successfully in this session.
   */
  setUserAttributes(options: SetUserAttributes): Promise<SetUserAttributesResponse>;

  /**
   * Fetch stored attributes for the current user/installation.
   * Requires `init` to have run successfully in this session.
   */
  getUserAttributes(): Promise<GetUserAttributesResponse>;
}

const PushWaveClient: PushWaveClientType = {
  init(options) {
    return registerPushWave(options);
  },
  identify(options) {
    return identify(options)
  },
  logout() {
    return logout();
  },
  setUserAttributes(options) {
    return setUserAttributes(options)
  },
  getUserAttributes() {
    return getUserAttributes();
  },
};

export default PushWaveClient;

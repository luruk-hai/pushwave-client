import { registerPushWave, RegisterPushWaveClient, RegisterPushWaveResponse } from "./register";
import { identify, IdentifyOptions, IdentifyResponse } from "./identify";
import { LogoutResponse, logout } from "./logout";
import { setUserAttributes, SetUserAttributes, SetUserAttributesResponse } from "./userAttributes";

export interface PushWaveClientType {
  init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;
  identify(options: IdentifyOptions): Promise<IdentifyResponse>;
  logout(): Promise<LogoutResponse>;
  setUserAttributes(options: SetUserAttributes): Promise<SetUserAttributesResponse>
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
  }
};

export default PushWaveClient;
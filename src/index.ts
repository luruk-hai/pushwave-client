import { registerPushWave, RegisterPushWaveClient, RegisterPushWaveResponse } from "./register";
import { identify, IdentifyOptions, IdentifyResponse } from "./identify";
import { LogoutResponse, logout } from "./logout";

export interface PushWaveClientType {
  init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;
  identify(options: IdentifyOptions): Promise<IdentifyResponse>;
  logout(): Promise<LogoutResponse>;
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
  }
};

export default PushWaveClient;
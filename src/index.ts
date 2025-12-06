import { registerPushWave, RegisterPushWaveClient, RegisterPushWaveResponse } from "./register";

export interface PushWaveClientType {
  init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;
}

const PushWaveClient: PushWaveClientType = {
  init(options) {
    return registerPushWave(options);
  },
};

export default PushWaveClient;
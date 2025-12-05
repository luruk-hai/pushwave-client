import { RegisterPushWaveClient, RegisterPushWaveResponse } from "./registerPushWave";
export interface PushWaveClientType {
    init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;
}
declare const PushWaveClient: PushWaveClientType;
export default PushWaveClient;

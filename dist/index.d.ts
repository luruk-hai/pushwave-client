import { RegisterPushWaveClient, RegisterPushWaveResponse } from "./register";
export interface PushWaveClientType {
    init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;
}
declare const PushWaveClient: PushWaveClientType;
export default PushWaveClient;

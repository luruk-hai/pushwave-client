import { RegisterPushWaveClient, RegisterPushWaveResponse } from "./register";
import { IdentifyOptions, IdentifyResponse } from "./identify";
import { LogoutResponse } from "./logout";
export interface PushWaveClientType {
    init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;
    identify(options: IdentifyOptions): Promise<IdentifyResponse>;
    logout(): Promise<LogoutResponse>;
}
declare const PushWaveClient: PushWaveClientType;
export default PushWaveClient;

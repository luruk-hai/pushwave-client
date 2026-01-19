import { RegisterPushWaveClient, RegisterPushWaveResponse } from "./register";
import { IdentifyOptions, IdentifyResponse } from "./identify";
import { LogoutResponse } from "./logout";
import { SetUserAttributes, SetUserAttributesResponse } from "./userAttributes";
export interface PushWaveClientType {
    init(options: RegisterPushWaveClient): Promise<RegisterPushWaveResponse>;
    identify(options: IdentifyOptions): Promise<IdentifyResponse>;
    logout(): Promise<LogoutResponse>;
    setUserAttributes(options: SetUserAttributes): Promise<SetUserAttributesResponse>;
}
declare const PushWaveClient: PushWaveClientType;
export default PushWaveClient;

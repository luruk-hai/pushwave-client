import { GetUserAttributesResponse, SetUserAttributes, SetUserAttributesResponse } from "./userAttributes.dto";
export declare function setUserAttributes(attributes: SetUserAttributes): Promise<SetUserAttributesResponse>;
export declare function getUserAttributes(): Promise<GetUserAttributesResponse>;

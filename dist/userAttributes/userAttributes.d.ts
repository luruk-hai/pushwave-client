import { GetUserAttributesResponse, SetUserAttributes, SetUserAttributesResponse } from "./userAttributes.dto";
/**
 * Set custom attributes for the current user/installation. Requires a successful init.
 */
export declare function setUserAttributes(attributes: SetUserAttributes): Promise<SetUserAttributesResponse>;
/**
 * Retrieve attributes for the current user/installation. Requires a successful init.
 */
export declare function getUserAttributes(): Promise<GetUserAttributesResponse>;

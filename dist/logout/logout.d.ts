import { LogoutResponse } from "./logout.dto";
/**
 * Unregister the current installation (e.g., on user logout). Requires a successful init.
 */
export declare function logout(): Promise<LogoutResponse>;

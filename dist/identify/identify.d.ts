import { IdentifyOptions, IdentifyResponse } from "./identify.dto";
/**
 * Link a userId to the current installation. Requires a successful registerPushWave/init call.
 */
export declare function identify({ userId }: IdentifyOptions): Promise<IdentifyResponse>;

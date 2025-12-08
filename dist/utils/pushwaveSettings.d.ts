export type PushwaveSettings = {
    cloudProjectNumber?: string | number;
    [key: string]: unknown;
};
export declare function getPushwaveSettings(): Promise<PushwaveSettings>;

export declare function fetchApiPost<TResponse>(path: string, data?: Record<string, any>): Promise<TResponse>;
export declare function fetchApiGet<TResponse>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<TResponse>;

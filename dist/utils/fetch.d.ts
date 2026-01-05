type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type FetchParams = Record<string, string | number | boolean | undefined>;
type FetchData = Record<string, any>;
export declare function fetchApi<TResponse>(method: FetchMethod, path: string, { params, data }?: {
    params?: FetchParams;
    data?: FetchData;
}): Promise<TResponse>;
export {};

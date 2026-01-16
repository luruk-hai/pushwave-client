type SecureStoreModule = {
    getItemAsync(key: string): Promise<string | null>;
    setItemAsync(key: string, value: string): Promise<void>;
    deleteItemAsync(key: string): Promise<void>;
};
export declare const loadSecureStore: () => SecureStoreModule | null;
export {};

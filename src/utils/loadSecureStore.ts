type SecureStoreModule = {
    getItemAsync(key: string): Promise<string | null>;
    setItemAsync(key: string, value: string): Promise<void>;
    deleteItemAsync(key: string): Promise<void>;
};

export const loadSecureStore = (): SecureStoreModule | null => {
    try {
        return require("expo-secure-store") as SecureStoreModule;
    } catch (err) {
        return null;
    }
};
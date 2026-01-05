"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApi = fetchApi;
const BASE_URL = "https://api.pushwave.dev/v1/public/";
async function fetchApi(method, path, { params, data } = {}) {
    const search = params
        ? new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
            if (value === undefined)
                return acc;
            acc[key] = String(value);
            return acc;
        }, {})).toString()
        : "";
    console.log("Go fetch !");
    const url = BASE_URL + path + (search ? `?${search}` : "");
    const headers = {};
    const body = data !== undefined && method !== "GET" ? JSON.stringify(data) : undefined;
    if (body) {
        headers["Content-Type"] = "application/json";
    }
    const res = await fetch(url, {
        method,
        headers,
        body,
    });
    const text = await res.text();
    let json = null;
    try {
        json = text ? JSON.parse(text) : null;
    }
    catch (err) {
        // JSON empty/invalid
    }
    if (!res.ok) {
        const apiError = (json?.error ?? json?.message ?? "");
        const message = `(${res.status}) ${apiError}`.trim();
        throw new Error(message);
    }
    return json;
}

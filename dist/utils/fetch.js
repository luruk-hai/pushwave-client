"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApi = fetchApi;
const BASE_URL = "https://pushwave.luruk-hai.fr";
async function fetchApi(path, data) {
    const url = BASE_URL + path;
    console.log(data);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

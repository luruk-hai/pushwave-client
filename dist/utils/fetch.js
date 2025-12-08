"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApiPost = fetchApiPost;
exports.fetchApiGet = fetchApiGet;
const BASE_URL = "https://pushwave.luruk-hai.fr/v1/";
async function fetchApiPost(path, data = {}) {
    const url = BASE_URL + path;
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
async function fetchApiGet(path, params) {
    const search = params
        ? new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
            if (value === undefined)
                return acc;
            acc[key] = String(value);
            return acc;
        }, {})).toString()
        : "";
    const url = BASE_URL + path + (search ? `?${search}` : "");
    const res = await fetch(url);
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

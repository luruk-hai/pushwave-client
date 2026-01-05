const BASE_URL = "https://api.pushwave.dev/v1/public/";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type FetchParams = Record<string, string | number | boolean | undefined>;
type FetchData = Record<string, any>;

export async function fetchApi<TResponse>(
  method: FetchMethod,
  path: string,
  { params, data }: { params?: FetchParams; data?: FetchData } = {}
): Promise<TResponse> {
  const search = params
    ? new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
          if (value === undefined) return acc;
          acc[key] = String(value);
          return acc;
        }, {})
      ).toString()
    : "";

    console.log("Go fetch !");

  const url = BASE_URL + path + (search ? `?${search}` : "");

  const headers: Record<string, string> = {};
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
  let json: any = null;

  try {
    json = text ? JSON.parse(text) : null;
  } catch (err) {
    // JSON empty/invalid
  }

  if (!res.ok) {
    const apiError = (json?.error ?? json?.message ?? "") as string;

    const message = `(${res.status}) ${apiError}`.trim();

    throw new Error(message);
  }

  return json as TResponse;
}

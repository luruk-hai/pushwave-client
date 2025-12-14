const BASE_URL = "https://api.pushwave.dev/v1/public/";

export async function fetchApiPost<TResponse>(
  path: string,
  data: Record<string, any> = {}
): Promise<TResponse> {

  const url = BASE_URL + path;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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

export async function fetchApiGet<TResponse>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
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

  const url = BASE_URL + path + (search ? `?${search}` : "");

  const res = await fetch(url);

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

const BASE_URL = "https://pushwave.luruk-hai.fr";

export async function fetchApi<TResponse>(
  path: string,
  data: Record<string, any>
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

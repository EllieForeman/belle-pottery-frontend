const BASE_URL = process.env.NEXT_PUBLIC_CMS_BASE_URL;

export async function fetchFromCMS(endpoint: string, query = "") {
  const url = `${BASE_URL}/${endpoint}?populate=*${query ? `&${query}` : ""}`;
  try {
    const res = await fetch(url, {});

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

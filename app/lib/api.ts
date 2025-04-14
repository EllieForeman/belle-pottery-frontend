const BASE_URL = process.env.NEXT_PUBLIC_CMS_BASE_URL;

export async function fetchFromCMS(endpoint: string) {
  console.log("BASE_URL:", process.env.NEXT_PUBLIC_CMS_BASE_URL);
  console.log("here", `${BASE_URL}/${endpoint}?populate=*`);

  try {
    const res = await fetch(`${BASE_URL}/${endpoint}?populate=*`, {
      next: { revalidate: false },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

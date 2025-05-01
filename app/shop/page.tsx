import { fetchFromCMS } from "../lib/api";
import FilterControls from "../components/shopFilters";

export default async function ShopPage() {
  const shopData = await fetchFromCMS("sale-items");

  return <FilterControls products={shopData.data} />;
}

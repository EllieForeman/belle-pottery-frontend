import { fetchFromCMS } from "../lib/api";
import FilterControls from "../components/shopFilters";

export default async function ShopPage() {
  const shopData = await fetchFromCMS("sale-items");
  return (
    <div className="w-full sm:w-[95%] max-w-[1800px] mx-auto px-4 sm:px-2 pb-10">
      {/* <p className="pl-4 py-2 align-middle">Next shop update coming on ...</p> */}
      <FilterControls products={shopData.data} />
    </div>
  );
}

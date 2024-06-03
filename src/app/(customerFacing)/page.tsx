import { GetMostPopularItems, GetNewestItems } from "./Api/apiData";
import ProductGridSection from "./_components/ProductGridSection";

export default function Homepage(){
    return (
      <main className="space-y-12">
        <ProductGridSection
          title="Most Popular"
          productFetcher={GetMostPopularItems}
        />
        <ProductGridSection title="Newest" productFetcher={GetNewestItems} />
      </main>
    );
}
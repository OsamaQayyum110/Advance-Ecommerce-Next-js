import { Suspense } from "react";
import { GetItems } from "../Api/apiData";
import { ProductCardSkeleton } from "../_components/ProductCard";
import ProductGridSection, { ProductSuspense } from "../_components/ProductGridSection";


export default function Products() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductSuspense productsFetcher={GetItems} />
      </Suspense>
    </div>
  );
}

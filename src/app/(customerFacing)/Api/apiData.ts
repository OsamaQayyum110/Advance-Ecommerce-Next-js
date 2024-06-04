import db from "@/db/db";
import { cache } from "@/lib/cache";

export const GetMostPopularItems = cache(async () => {
  const mostPopularProducts = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
  return mostPopularProducts;
}, ["/", "GetMostPopularItems"], { revalidate: 60 * 60 * 24 });
 
export  const GetNewestItems = cache(async () => {
  const newProducts = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  return newProducts;
}, ["/", "GetNewestItems"]);

export const GetItems = cache(async () => {
  const newProducts = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "desc" },
  });
  return newProducts;
}, ["/products", "GetItems"]);



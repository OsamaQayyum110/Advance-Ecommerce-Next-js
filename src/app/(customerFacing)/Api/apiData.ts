import db from "@/db/db";

export async function GetMostPopularItems() {
  const mostPopularProducts = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
  return mostPopularProducts;
}
export async function GetNewestItems() {
  const newProducts = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  return newProducts;
}
export async function GetItems() {
  const newProducts = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "desc" },
  });
  return newProducts;
}



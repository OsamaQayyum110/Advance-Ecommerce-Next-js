import db from "@/db/db";

// Function to get sales data
export async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidAtPkr: true },
    _count: true,
  });
  return {
    amount: data._sum.pricePaidAtPkr || 0,
    numberOfSale: data._count,
  };
}

// Function to get user data
export async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidAtPkr: true },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.pricePaidAtPkr || 0) / userCount,
  };
}

// Function to get product data
export async function getProductData() {
  const [activeProduct, inActiveProduct] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return {
    activeProduct,
    inActiveProduct,
  };
}

// Function to get products
export async function getProducts() {
  const result = await db.product.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      priceInPkr: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });
  // console.log(result)
  return result;
}

export async function getUser() {
  const result = await db.user.findMany({
    select: {
      id: true,
      email: true,
      createdAt: true,
      orders: { select: { pricePaidAtPkr: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  //console.log("result Users ====>", JSON.stringify(result, null, 2));
  return result;
}

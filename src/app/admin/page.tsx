import DashboardCard from "@/app/admin/_components/DashboardCard";
import React from "react";
import { getProductData, getUserData, getSalesData } from "./Api/apiData";
import { currencyFormatter, numberFormatter } from "@/lib/formatter";

const AdminDashboard = async () => {
  const [productData, SaleData, UserData] = await Promise.all([
    getProductData(),
    getSalesData(),
    getUserData(),
  ]);
  return (
    <>
      <DashboardCard
        title={"Sales"}
        subtitle={`${numberFormatter(SaleData.numberOfSale)} Orders`}
        body={`${currencyFormatter(SaleData.amount)}`}
      />

      <DashboardCard
        title={"Customers"}
        subtitle={`${currencyFormatter(
          UserData.averageValuePerUser
        )} Average Value`}
        body={`${numberFormatter(UserData.userCount)}`}
      />

      <DashboardCard
        title={"Active Products"}
        subtitle={`${numberFormatter(productData.inActiveProduct)} inactive`}
        body={`${numberFormatter(productData.activeProduct)}`}
      />
    </>
  );
};

export default AdminDashboard;

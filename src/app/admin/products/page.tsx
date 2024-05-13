import React from "react";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import ProductTable from "./_components/ProductTable";
import Link from "next/link";

const Products = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader>Products</PageHeader>
        <Button asChild><Link href="/admin/products/new">Add Products</Link></Button>
      </div>
      <ProductTable/>
    </>
  );
};

export default Products;

import PageHeader from "@/app/admin/_components/PageHeader";
import db from "@/db/db";
import { notFound } from "next/navigation";
import ProductTable from "../../_components/ProductTable";
import ProductForm from "../../_components/ProductForm";

export default async function EditProduct({
  params: { id },
}: {
  params: { id: string };
}) {
    const product = await db.product.findUnique({ where: { id } });

    return (
        <>
            <PageHeader>Edit Product</PageHeader>
            <ProductForm product={product}/>
        </>
    )
}

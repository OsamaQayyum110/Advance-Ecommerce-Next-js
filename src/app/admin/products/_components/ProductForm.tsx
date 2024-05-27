"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { addProduct, updateProduct } from "../../_actions/products";
import { currencyFormatter } from "@/lib/formatter";
import { useFormState } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

const ProductForm = ({ product }: { product?: Product | null }) => {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInPKR, setPriceInPKR] = useState<number | undefined>(
    product?.priceInPkr
  );
  console.log("=======>", error.file);
  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          id="name"
          type="text"
          defaultValue={product?.name || ""}
        />
        {error?.name && <div className="text-destructive">{error?.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          name="category"
          id="category"
          type="text"
          defaultValue={product?.category || ""}
        />
        {error?.category && (
          <div className="text-destructive">{error?.category}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInPKR">Price</Label>
        <Input
          name="priceInPKR"
          id="priceInPKR"
          type="number"
          value={priceInPKR}
          onChange={(e) => setPriceInPKR(Number(e.target.value) || undefined)}
          defaultValue={product?.priceInPkr || ""}
          required
        />
        <div className="text-muted-foreground">
          {priceInPKR && currencyFormatter(Number(priceInPKR))}
        </div>
        {error?.priceInPKR && (
          <div className="text-destructive">{error?.priceInPKR}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          defaultValue={product?.description}
        />
        {error?.description && (
          <div className="text-destructive">{error?.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input name="file" id="file" type="file" required={product == null} />
        {product != null && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
        
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          name="image"
          id="image"
          type="file"
          accept="image/*"
          required={product == null}
        />
        {product != null && (
          <Image
            src={product.imagepath}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error?.image && <div className="text-destructive">{error?.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
};
export default ProductForm;

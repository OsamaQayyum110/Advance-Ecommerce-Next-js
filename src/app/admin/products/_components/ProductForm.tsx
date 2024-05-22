"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { addProduct } from "../../_actions/products";
import { currencyFormatter } from "@/lib/formatter";
import { useFormState } from "react-dom";

const ProductForm = () => {
  const [error, action] = useFormState(addProduct, {});
  const [priceInPKR, setPriceInPKR] = useState<string>("");
  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" />
        {error?.name && <div className="text-destructive">{error?.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input name="category" id="category" type="text" />
        {error?.category && <div className="text-destructive">{error?.category}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInPKR">Price</Label>
        <Input
          name="priceInPKR"
          id="priceInPKR"
          type="number"
          value={priceInPKR}
          onChange={(e) => setPriceInPKR(e.target.value)}
          required
        />
        <div className="text-muted-foreground">
          {priceInPKR && currencyFormatter(Number(priceInPKR))}
        </div>
        {error?.priceInPKR && <div className="text-destructive">{error?.priceInPKR}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />
        {error?.description && <div className="text-destructive">{error?.description}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input name="file" id="file" type="file" accept=".docx, .pdf" />
        {error?.file && <div className="text-destructive">{error?.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input name="image" id="image" type="file" accept="image/*" />
        {error?.image && <div className="text-destructive">{error?.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
};
export default ProductForm;

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { addProduct } from "../../_actions/products";
import { currencyFormatter } from "@/lib/formatter";

const ProductForm = () => {
  const [priceInPKR, setPriceInPKR] = useState<number | undefined>();
  return (
    <form action={addProduct} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          name="price"
          id="price"
          type="number"
          value={priceInPKR}
          onChange={(e) => setPriceInPKR(Number(e.target.value) || undefined)}
          required
        />
        <div className="text-muted-foreground">
          {currencyFormatter(priceInPKR || 0)}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input name="file" id="file" type="file" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input name="image" id="image" type="file" required />
      </div>
      <SubmitButton />
    </form>
  );
};
export default ProductForm;

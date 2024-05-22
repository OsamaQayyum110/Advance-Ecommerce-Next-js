"use server";

import db from "@/db/db";
import { error } from "console";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" }).refine(
  (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // Add other document MIME types if needed
    ];
    return allowedTypes.includes(file.type);
  },
  { message: "Invalid file type" }
);

const imageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"));

const addSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  priceInPKR: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, FormData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(FormData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  console.log(result);

  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagepath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagepath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  const productResult = await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      category: data.category,
      description: data.description,
      priceInPkr: data.priceInPKR,
      filePath,
      imagepath,
    },
  });
    console.log(productResult);
    redirect("/admin/products");
    
}

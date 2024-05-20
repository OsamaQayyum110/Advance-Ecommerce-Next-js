"use server"

import { error } from "console";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" }).refine(file => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        // Add other document MIME types if needed
    ];
    return allowedTypes.includes(file.type);
}, { message: "Invalid file type" });

const imageSchema = z.instanceof(File, { message: "Required" }).refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInPKR: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageSchema.refine(file => file.size > 0, "Required"),

})

export async function addProduct(prevState: unknown, FormData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(FormData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }
    console.log(FormData);
}
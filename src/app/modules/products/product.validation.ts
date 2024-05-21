import { z } from "zod";

const TVariantSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

const TInventorySchema = z.object({
  quantity: z.number().int().positive(),
  inStock: z.boolean(),
});

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  variants: z.array(TVariantSchema),
  inventory: TInventorySchema,
});
export default productSchema;

import { z } from "zod";
const orderSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  price: z
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price is required"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity is required"),
});

export default orderSchema;

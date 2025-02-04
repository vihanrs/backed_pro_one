import { z } from "zod";

export const ProductDTO = z.object({
  categoryId: z.string().nonempty("Category ID is required"),
  name: z.string().nonempty("Name is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  description: z.string().nonempty("Description is required"),
  image: z.string().nonempty("Image URL is required"),
});

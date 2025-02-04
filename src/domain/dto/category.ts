import { z } from "zod";

export const CategoryDTO = z.object({
  name: z.string().nonempty("Category name is required"),
});

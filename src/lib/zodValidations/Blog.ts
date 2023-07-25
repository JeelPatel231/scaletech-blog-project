import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const BlogValidationSchema = z.object({
  id: z.string().default(uuidv4),
  title: z.string(),
  description: z.string(),
  content: z.string(),
})

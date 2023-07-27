import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const BlogValidationSchema = z.object({
  id: z.string().default(uuidv4),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  content: z.string().trim().min(1),
  tags: z.string(),
})

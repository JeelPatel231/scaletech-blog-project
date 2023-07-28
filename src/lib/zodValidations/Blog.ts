import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { TagValidation } from "./Tag";

export const BlogValidationSchema = z.object({
  id: z.string().default(uuidv4),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  content: z.string().trim().min(1),
  tags: z.string()
    .transform(x => x.split(" ").map(y => y.trim()).filter(z => z !== ''))
    .pipe(z.array(TagValidation))
    .transform(tagArr => Array.from(new Set(tagArr))),
})

import { z } from "zod"

const ValidateAppConfig = z.object({
  jwtToken: z.string().nonempty().transform(
    x => new TextEncoder().encode(x)
  ),
  jwtAlg: z.string().nonempty().default("HS256"),
  postgresUrl: z.string().url(),
  mode: z.string().default("development")
})

export const APP_CONFIG = ValidateAppConfig.parse({
  jwtToken: import.meta.env.VITE_JWT_SECRET,
  postgresUrl: import.meta.env.VITE_POSTGRES_URL,
  mode: import.meta.env.MODE,
  jwtAlg: import.meta.env.VITE_JWT_ALG,
})

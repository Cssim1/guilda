import { z } from "zod"

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),

    email: z.string().email("Email inválido"),
    confirmEmail: z.string().email("Email inválido"),

    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),

    discordNick: z.string().min(2, "Nick inválido"),
    discordTag: z
      .string()
      .regex(/^\d{4}$/, "A tag deve conter 4 números"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os emails não coincidem",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

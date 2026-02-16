export type UserRole = "user" | "mod" | "admin"

export interface User {
  id: string
  email: string
  role: UserRole
  verified: boolean
}

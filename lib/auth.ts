import { auth } from "@/auth"

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
} 
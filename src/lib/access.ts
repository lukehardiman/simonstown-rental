import type { Access } from 'payload'

export const isLoggedIn: Access = ({ req: { user } }) => {
  console.log('[ACCESS] isLoggedIn called, user:', user ? user.email : 'NO USER', 'result:', Boolean(user))
  return Boolean(user)
}

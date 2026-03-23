import type { Access } from 'payload'

/** Any authenticated user may perform this operation. */
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

import { auth } from "@/auth";
import { ActionType, ModuleName, AuthUser } from "@/types/auth";

/**
 * Get the current session on the server
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession();
  return session?.user as AuthUser || null;
}

/**
 * Check if the user has permission for a specific module and action
 */
export function hasPermission(
  user: AuthUser | null | undefined,
  module: ModuleName,
  action: ActionType
): boolean {
  if (!user) return false;
  
  // Super Admins have all permissions
  if (user.role === 'SUPER_ADMIN') return true;

  const permission = user.permissions.find((p) => p.module === module);
  if (!permission) return false;

  return permission.actions.includes(action);
}

/**
 * Helper to identify tenant from hostname
 */
export function getTenantFromHost(host: string | null) {
  if (!host) return null;
  const parts = host.split('.');
  if (parts.length > 2) {
    return parts[0]; // subdomain
  }
  return null;
}

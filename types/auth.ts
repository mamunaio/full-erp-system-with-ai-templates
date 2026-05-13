export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF';

export type ModuleName = 
  | 'dashboard'
  | 'hrm'
  | 'crm'
  | 'inventory'
  | 'finance'
  | 'sales'
  | 'procurement'
  | 'manufacturing'
  | 'projects'
  | 'analytics'
  | 'ai-hub'
  | 'settings';

export type ActionType = 'view' | 'create' | 'edit' | 'delete' | 'export';

export interface Permission {
  module: ModuleName;
  actions: ActionType[];
}

export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
  tenantId: string;
  tenantSlug: string;
  avatar?: string | null;
  permissions: Permission[];
}

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    tenantId: string;
    tenantSlug: string;
    permissions: Permission[];
  }
}

export type UserRole = 'SUPER_ADMIN' | 'OWNER' | 'ADMIN' | 'MANAGER' | 'USER';

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
  interface User {
    role?: UserRole;
    tenantId?: string;
    tenantSlug?: string;
    permissions?: Permission[];
  }
}

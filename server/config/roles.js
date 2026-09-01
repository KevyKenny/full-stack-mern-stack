export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
}

export const PERMISSIONS = {
  // Users
  VIEW_USERS: 'view:users',
  MANAGE_USERS: 'manage:users',
  UPDATE_USER_ROLE: 'update:user_role',
  DEACTIVATE_USER: 'deactivate:user',

  // Tasks
  VIEW_ALL_TASKS: 'view:all_tasks',
  VIEW_OWN_TASKS: 'view:own_tasks',
  CREATE_TASK: 'create:task',
  UPDATE_OWN_TASK: 'update:own_task',
  UPDATE_ANY_TASK: 'update:any_task',
  DELETE_OWN_TASK: 'delete:own_task',
  DELETE_ANY_TASK: 'delete:any_task',
}

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),

  [ROLES.EMPLOYEE]: [
    PERMISSIONS.VIEW_OWN_TASKS,
    PERMISSIONS.CREATE_TASK,
    PERMISSIONS.UPDATE_OWN_TASK,
    PERMISSIONS.DELETE_OWN_TASK,
  ],
}

export function getPermissionsForRole(role) {
  return ROLE_PERMISSIONS[role] || []
}

export function roleHasPermission(role, permission) {
  return getPermissionsForRole(role).includes(permission)
}

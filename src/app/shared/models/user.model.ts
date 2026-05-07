// src/app/shared/models/user.model.ts

/**
 * 核心用户模型定义
 */
export interface User {
  id: string | number;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  status: 'active' | 'inactive' | 'pending';
}

/**
 * 用户角色枚举
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

/**
 * 用于登录成功后的响应体
 */
export interface AuthResponse {
  token: string;
  user: User;
}

import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // 1. 重定向根路径到仪表盘
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  // 2. 受保护的业务路由（使用 MainLayout 布局）
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], // 全局身份验证守卫
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: '控制台 - 企业管理系统', // 自动设置页面标题
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/user-management/user-list.component').then((m) => m.UserListComponent),
        title: '用户管理',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
        title: '系统设置',
      },
    ],
  },

  // 3. 独立布局路由（如登录、注册）
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login.component').then((m) => m.LoginComponent),
        title: '登录',
      },
    ],
  },

  // 4. 404 页面兜底
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: '404 - 页面未找到',
  },
];

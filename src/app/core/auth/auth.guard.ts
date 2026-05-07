// src/app/core/auth/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * 核心逻辑：如果用户已登录，允许通过；
 * 否则，重定向到登录页面并记录当前尝试访问的 URL
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // 获取用户当前想要访问的路径，以便登录后跳回
  const returnUrl = state.url;

  // 跳转到登录页，并携带回跳参数
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl }
  });
};

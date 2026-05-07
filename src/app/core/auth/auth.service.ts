// src/app/core/auth/auth.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root', // 确保在全应用范围内是单例
})
export class AuthService {
  // 1. 使用 Signal 管理登录状态
  private currentUser = signal<any | null>(null);

  // 2. 暴露只读的计算属性供组件使用
  isLoggedIn = computed(() => !!this.currentUser() || !!localStorage.getItem('token'));

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // 初始化时从本地存储恢复用户信息（可选）
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  /**
   * 登录方法
   * @param credentials 包含用户名和密码的对象
   */
  login(credentials: { username: string; password: string }) {
    // 模拟 API 请求，实际开发中请替换为真实的 API 地址
    return this.http.post<any>('/api/auth/login', credentials).pipe(
      tap((response) => {
        // 保存 Token 和用户信息
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // 更新 Signal 状态
        this.currentUser.set(response.user);
      }),
    );
  }

  /**
   * 退出登录
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  /**
   * 获取当前的 Token (供拦截器使用)
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * 检查登录状态的快捷方法 (供 Guard 使用)
   */
  checkAuth(): boolean {
    return this.isLoggedIn();
  }
}

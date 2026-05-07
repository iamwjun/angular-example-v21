// src/app/layout/auth-layout/auth-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="brand">
          <img src="assets/logo.svg" alt="Logo" class="logo" />
          <h2>企业管理平台</h2>
        </div>

        <!-- 登录/注册表单将在这里渲染 -->
        <router-outlet></router-outlet>

        <div class="auth-footer">
          <p>&copy; 2026 技术支持: 浩鲸百应研发中心</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-wrapper {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .auth-card {
        width: 100%;
        max-width: 400px;
        padding: 40px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
      .brand {
        text-align: center;
        margin-bottom: 30px;
        .logo {
          width: 64px;
          margin-bottom: 16px;
        }
        h2 {
          color: #333;
          font-size: 24px;
        }
      }
      .auth-footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    `,
  ],
})
export class AuthLayoutComponent {}

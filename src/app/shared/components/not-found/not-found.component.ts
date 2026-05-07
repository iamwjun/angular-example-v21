// src/app/shared/components/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="error-container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <div class="error-illustration">
          <!-- 这里可以使用 SVG 或者图标库 -->
          <span class="icon">🚀</span>
        </div>
        <h2 class="error-title">页面消失在太空中...</h2>
        <p class="error-message">抱歉，您访问的页面不存在或已被移除。请检查输入的地址是否正确。</p>
        <div class="error-actions">
          <a routerLink="/" class="btn-primary">返回首页</a>
          <button class="btn-secondary" (click)="goBack()">返回上一页</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .error-container {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f2f5;
        text-align: center;
        padding: 0 20px;
      }
      .error-code {
        font-size: 120px;
        font-weight: 900;
        line-height: 1;
        margin: 0;
        color: #1890ff;
        letter-spacing: -5px;
        opacity: 0.8;
      }
      .error-illustration {
        font-size: 64px;
        margin: 20px 0;
      }
      .error-title {
        font-size: 24px;
        color: #262626;
        margin-bottom: 16px;
      }
      .error-message {
        color: #8c8c8c;
        margin-bottom: 32px;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
      .error-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
      }
      .btn-primary {
        padding: 10px 24px;
        background: #1890ff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background 0.3s;
        &:hover {
          background: #40a9ff;
        }
      }
      .btn-secondary {
        padding: 10px 24px;
        border: 1px solid #d9d9d9;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          border-color: #40a9ff;
          color: #40a9ff;
        }
      }
    `,
  ],
})
export class NotFoundComponent {
  goBack() {
    // 简单的历史回退逻辑
    window.history.back();
  }
}

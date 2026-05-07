// layout/main-layout/sidebar/sidebar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed">
      <nav class="nav-list">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="icon">📊</span>
          <span class="label">仪表盘</span>
        </a>
        <a routerLink="/users" routerLinkActive="active" class="nav-item">
          <span class="icon">👥</span>
          <span class="label">用户管理</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <span class="icon">⚙️</span>
          <span class="label">系统设置</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [
    `
      .sidebar {
        width: 240px;
        height: 100vh;
        background: #001529;
        color: #fff;
        transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
        overflow: hidden;
      }
      .sidebar.collapsed {
        width: 80px;
      }
      .nav-list {
        padding-top: 16px;
      }
      .nav-item {
        display: flex;
        align-items: center;
        padding: 12px 24px;
        color: rgba(255, 255, 255, 0.65);
        text-decoration: none;
        white-space: nowrap;
      }
      .nav-item:hover,
      .active {
        color: #fff;
        background: #1890ff;
      }
      .icon {
        margin-right: 12px;
        font-size: 18px;
      }
      .collapsed .label {
        display: none;
      }
      .collapsed .icon {
        margin-right: 0;
      }
      .collapsed .nav-item {
        justify-content: center;
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() collapsed = false;
}

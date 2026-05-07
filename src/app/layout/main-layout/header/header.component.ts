// layout/main-layout/header/header.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="left-section">
        <button class="menu-btn" (click)="toggleSidebar.emit()">
          <span class="icon">☰</span>
        </button>
        <h1 class="logo">Enterprise Admin</h1>
      </div>

      <div class="right-section">
        <div class="user-info">
          <span>Wu Jun</span>
          <img src="assets/images/avatar.png" alt="User Avatar" class="avatar" />
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        height: 64px;
        padding: 0 24px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        z-index: 10;
      }
      .left-section {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .menu-btn {
        cursor: pointer;
        border: none;
        background: none;
        font-size: 20px;
      }
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-left: 12px;
      }
    `,
  ],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
}

// src/app/layout/main-layout/main-layout.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoggerService } from '../../core/services/logger.service';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  private logger = inject(LoggerService);
  private config = inject(ConfigService);

  // 使用 Signal 管理侧边栏状态，性能更优且符合 2026 开发趋势
  isSidebarCollapsed = signal(false);

  toggleSidebar() {
    this.isSidebarCollapsed.update(val => !val);
  }
}

// features/dashboard/dashboard.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-grid">
      @for (stat of stats(); track stat.label) {
        <div class="stat-card">
          <h3>{{ stat.label }}</h3>
          <p class="value">{{ stat.value }}</p>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      .stat-card {
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
    `,
  ],
})
export class DashboardComponent {
  stats = signal([
    { label: '活跃用户', value: '1,280' },
    { label: '本月营收', value: '¥452,000' },
    { label: '待处理工单', value: '12' },
  ]);
}

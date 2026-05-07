// layout/main-layout/footer/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>© 2026 Enterprise Solutions Inc. All Rights Reserved. v1.2.0</p>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 16px 24px;
        text-align: center;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        border-top: 1px solid #f0f0f0;
        background: #fdfdfd;
      }
    `,
  ],
})
export class FooterComponent {}

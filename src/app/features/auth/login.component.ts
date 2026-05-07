// features/auth/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" [(ngModel)]="credentials.username" name="username" required />
      </div>
      <div class="form-group">
        <label>密码</label>
        <input type="password" [(ngModel)]="credentials.password" name="password" required />
      </div>
      <button type="submit" [disabled]="loading() || !loginForm.valid">
        {{ loading() ? '登录中...' : '登录' }}
      </button>
      @if (errorMessage()) {
        <p class="error">{{ errorMessage() }}</p>
      }
    </form>
  `,
  styles: [
    `
      .form-group {
        margin-bottom: 1rem;
      }
      .error {
        color: red;
      }
    `,
  ],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  credentials = { username: '', password: '' };
  loading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    this.loading.set(true);
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // 登录成功，跳转回之前的页面或首页
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.errorMessage.set('登录失败，请检查账号密码');
        this.loading.set(false);
      },
    });
  }
}

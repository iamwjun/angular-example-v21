// src/app/features/settings/settings.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="settings-container">
      <h2>系统设置</h2>

      <div class="settings-card">
        <h3>个人资料</h3>
        <form [formGroup]="settingsForm" (ngSubmit)="onSave()">
          <div class="form-item">
            <label>显示名称</label>
            <input type="text" formControlName="displayName" placeholder="请输入名称" />
            @if (
              settingsForm.get('displayName')?.invalid && settingsForm.get('displayName')?.touched
            ) {
              <small class="error-msg">名称是必填项</small>
            }
          </div>

          <div class="form-item">
            <label>邮箱地址</label>
            <input type="email" formControlName="email" />
          </div>

          <div class="form-item">
            <label>界面语言</label>
            <select formControlName="language">
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English</option>
            </select>
          </div>

          <div class="form-item">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="emailNotifications" /> 接收邮件通知
            </label>
          </div>

          <div class="actions">
            <button type="submit" [disabled]="settingsForm.invalid || isSubmitting()">
              {{ isSubmitting() ? '保存中...' : '保存更改' }}
            </button>
            <button type="button" class="btn-ghost" (click)="onReset()">重置</button>
          </div>
        </form>
      </div>

      <div class="settings-card danger-zone">
        <h3>账户安全</h3>
        <button class="btn-danger" (click)="onLogout()">退出登录</button>
      </div>
    </div>
  `,
  styles: [
    `
      .settings-container {
        max-width: 800px;
        margin: 0 auto;
      }
      .settings-card {
        background: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
      }
      .form-item {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
      }
      .form-item label {
        margin-bottom: 8px;
        font-weight: 500;
      }
      .form-item input[type='text'],
      .form-item input[type='email'],
      .form-item select {
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
      }
      .checkbox-label {
        flex-direction: row;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }
      .error-msg {
        color: #ff4d4f;
        font-size: 12px;
        margin-top: 4px;
      }
      .btn-ghost {
        background: none;
        border: 1px solid #d9d9d9;
        cursor: pointer;
      }
      .btn-danger {
        background: #ff4d4f;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }
      .danger-zone {
        border-top: 4px solid #ff4d4f;
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  settingsForm!: FormGroup;
  isSubmitting = signal(false);

  ngOnInit() {
    // 初始化表单结构
    this.settingsForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: [{ value: '', disabled: true }], // 假设邮箱不可修改
      language: ['zh-CN'],
      emailNotifications: [true],
    });

    // 模拟从后端加载初始数据
    this.loadSettings();
  }

  loadSettings() {
    // 实际项目中应从 UserService 获取
    this.settingsForm.patchValue({
      displayName: '吴军',
      email: 'wujun@example.com',
      language: 'zh-CN',
      emailNotifications: true,
    });
  }

  onSave() {
    if (this.settingsForm.valid) {
      this.isSubmitting.set(true);
      console.log('正在保存设置:', this.settingsForm.value);

      // 模拟网络请求
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert('设置已成功保存');
      }, 1000);
    }
  }

  onReset() {
    this.loadSettings();
  }

  onLogout() {
    if (confirm('确定要退出登录吗？')) {
      this.authService.logout();
    }
  }
}

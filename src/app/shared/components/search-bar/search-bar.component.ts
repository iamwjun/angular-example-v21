// src/app/shared/components/search-bar/search-bar.component.ts
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        [placeholder]="placeholder"
        [(ngModel)]="query"
        (ngModelChange)="onModelChange($event)"
        class="search-input"
      />
      @if (query()) {
        <button class="clear-btn" (click)="clear()">✕</button>
      }
    </div>
  `,
  styles: [`
    .search-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 400px;
    }
    .search-icon { position: absolute; left: 12px; color: #8c8c8c; }
    .search-input {
      width: 100%;
      padding: 8px 36px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      transition: all 0.3s;
      &:focus { border-color: #40a9ff; outline: none; box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); }
    }
    .clear-btn {
      position: absolute;
      right: 12px;
      border: none;
      background: none;
      cursor: pointer;
      color: #bfbfbf;
    }
  `]
})
export class SearchBarComponent {
  @Input() placeholder = '请输入搜索内容...';

  // 定义输出事件
  @Output() search = new EventEmitter<string>();

  // 使用 Signal 管理内部输入值
  query = signal('');

  // 用于防抖处理的 RxJS Subject
  private searchSubject = new Subject<string>();

  constructor() {
    // 设置防抖：用户停止输入 300ms 后才触发搜索
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value);
    });
  }

  onModelChange(value: string) {
    this.query.set(value);
    this.searchSubject.next(value);
  }

  clear() {
    this.query.set('');
    this.searchSubject.next('');
  }
}

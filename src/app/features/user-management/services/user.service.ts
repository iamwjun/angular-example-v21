// features/user-management/services/user.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/models/user.model';

@Injectable() // 注意：这里不写 providedIn: 'root'，则该服务随模块销毁
export class UserService {
  private http = inject(HttpClient);
  users = signal<User[]>([]);

  loadUsers() {
    this.http.get<User[]>('/api/users').subscribe(data => this.users.set(data));
  }
}

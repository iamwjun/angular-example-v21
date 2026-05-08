// features/user-management/services/user.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { ConfigService } from '../../../core/services/config.service';

@Injectable() // 如果只在该模块用，不建议写 providedIn: 'root'
export class UserService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);

  private readonly API_URL = `${this.config.get('apiUrl')}/users`;

  users = signal<User[]>([]);

  loadUsers() {
    this.http.get<User[]>('/api/users').subscribe(data => this.users.set(data));
  }

  /**
   * 获取用户列表（带分页和搜索）
   */
  getUsers(page: number, keyword?: string): Observable<User[]> {
    let params = new HttpParams().set('page', page.toString());
    if (keyword) {
      params = params.set('search', keyword);
    }

    return this.http.get<User[]>(this.API_URL, { params });
  }

  /**
   * 更新用户信息
   */
  updateUser(id: string | number, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/${id}`, data);
  }
}

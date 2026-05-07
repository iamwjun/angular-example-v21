// features/user-management/user-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  providers: [UserService], // 组件级别注入服务
  template: `
    <div class="page-header">
      <h2>用户管理</h2>
      <app-search-bar (search)="onSearch($event)"></app-search-bar>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        @for (user of userService.users(); track user.id) {
          <tr>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td><button (click)="editUser(user)">编辑</button></td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class UserListComponent implements OnInit {
  public userService = inject(UserService);

  ngOnInit() {
    this.userService.loadUsers();
  }

  onSearch(term: string) {
    console.log('搜索用户:', term);
  }

  editUser(user: any) {
    // 编辑逻辑
  }
}

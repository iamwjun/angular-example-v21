// src/app/core/services/config.service.ts
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  apiUrl: string;
  apiVersion: string;
  enableLogging: boolean;
  features: {
    darkMode: boolean;
    betaTesting: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // 使用 Signal 存储配置，方便在 UI 中响应式读取
  private configSignal = signal<AppConfig>({
    apiUrl: environment.apiUrl || 'http://localhost:3000',
    apiVersion: 'v1',
    enableLogging: !environment.production,
    features: {
      darkMode: false,
      betaTesting: false
    }
  });

  // 只读暴露
  readonly config = this.configSignal.asReadonly();

  /**
   * 获取特定配置项
   */
  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.configSignal()[key];
  }

  /**
   * 动态更新配置（例如用户切换了主题）
   */
  updateConfig(partialConfig: Partial<AppConfig>) {
    this.configSignal.update(current => ({
      ...current,
      ...partialConfig
    }));
  }

  /**
   * (进阶) 应用启动前初始化配置
   * 可在 APP_INITIALIZER 中调用
   */
  loadRuntimeConfig(): Promise<void> {
    // 实际项目中可以从后端 API 或本地 JSON 文件读取
    // return firstValueFrom(this.http.get<AppConfig>('/assets/config.json'))
    return Promise.resolve();
  }
}

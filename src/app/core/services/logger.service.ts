// src/app/core/services/logger.service.ts
import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private configService = inject(ConfigService);

  private get isEnabled(): boolean {
    return this.configService.get('enableLogging');
  }

  debug(message: string, ...args: any[]) {
    if (this.isEnabled) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]) {
    if (this.isEnabled) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  error(message: string, error?: any) {
    // 错误日志通常即使在生产环境也要打印
    console.error(`[ERROR] ${message}`, error);

    // 可以在这里扩展：发送错误到 Sentry 或后端 API
    this.sendToRemoteServer(message, error);
  }

  private sendToRemoteServer(message: string, error: any) {
    // 伪代码：if (environment.production) { http.post(...) }
  }
}

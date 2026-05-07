import { HttpInterceptorFn } from "@angular/common/http";

// core/interceptors/token.interceptor.ts
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(authReq);
};

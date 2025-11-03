import { HttpInterceptorFn } from '@angular/common/http';

export const authErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

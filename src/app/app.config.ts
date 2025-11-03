import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authErrorsInterceptor } from './interceptor/auth-errors-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authErrorsInterceptor])
    ),
    // El httoClient va hacer que se pueda comunicas la API
  ]
};

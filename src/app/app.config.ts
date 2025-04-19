import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { transition } from '@angular/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { resErrorInterceptor } from './core/interceptors/res-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptorInterceptor } from './core/interceptors/loading-interceptor.interceptor';
``
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([reqHeaderInterceptor,resErrorInterceptor,loadingInterceptorInterceptor])),
    importProvidersFrom(BrowserAnimationsModule,NgxSpinnerModule),
    provideClientHydration(withEventReplay()),provideToastr()]
};
``
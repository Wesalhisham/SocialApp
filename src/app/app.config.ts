import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration:'top'}) , withViewTransitions() , withHashLocation()),
    // provideHttpClient(withFetch() , withInterceptors([headerInterceptor , errorInterceptor , loadingInterceptor]) ), //httpclient , all interceptors
    provideHttpClient(withFetch() , withInterceptors([headerInterceptor , errorInterceptor ]) ), //httpclient , interceptors

     provideToastr(), //  ngx toster package

     //privide module  -> ngx-spinner
     importProvidersFrom( BrowserAnimationsModule, NgxSpinnerModule )

  ]
};

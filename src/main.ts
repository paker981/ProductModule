import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalHttpErrorHandler } from './app/interceptors/global-http-error-handler.interceptor';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // bootstrapApplication(AppComponent, {
  //   providers: [
  //     importProvidersFrom(
  //       BrowserAnimationsModule,
  //       HttpClientModule,
  //     ),
  //     {
  //       provide: HTTP_INTERCEPTORS,
  //       useClass: GlobalHttpErrorHandler,
  //       multi: true
  //     }
  //   ]
  // })
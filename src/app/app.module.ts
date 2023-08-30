import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from './modules/product/product.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { GlobalHttpErrorHandler } from './interceptors/global-http-error-handler.interceptor';
import { CustonSnackbarComponent } from './components/custon-snackbar/custon-snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustonSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ProductModule
  ],
  providers: [
    // {
    //   provide: ProductToken,
    //   useValue: 'dupa',
    //   multi: true
    // },
    // ['dupa']
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandler,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

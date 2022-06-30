import { GoogleMapsModule } from '@angular/google-maps';
import { MainModule } from './main/main.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InterceptorService } from './services/interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BorkerFeatureKey } from './redux/borker.state';
import { borkerReducer } from './redux/borker.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MapDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeaderModule,
    MaterialModule,
    HomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FontAwesomeModule,
    StoreModule.forRoot({[BorkerFeatureKey]: borkerReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

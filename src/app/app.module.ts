import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { fakeAuthBackendProvider } from './auth/interceptors/mock-backend';
import { fakeGrotBackendProvider } from './grot/interceptors/mock-backend.interceptor';
import { environment } from 'src/environments/environment';
import { MockSignalrService } from './grot/services/mock-signalr.service';
import { SignalrService } from './grot/services/signalr.service';
import { AuthenticationService } from './auth/services/authentication.service';
import { ComService } from './grot/services/com.service';
import { fakeRegistrationBackendProvider } from './auth/interceptors/mock-registration';

const mockInterceptors = [
  fakeAuthBackendProvider,
  fakeGrotBackendProvider,
  fakeRegistrationBackendProvider
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: SignalrService,
      useFactory: (
        authService: AuthenticationService,
        comService: ComService,
        ngZone: NgZone
      ) => {
        if (!environment.production && !environment.docker) {
          return new MockSignalrService(comService);
        }

        return new SignalrService(authService, comService, ngZone);
      },
      deps: [
        AuthenticationService,
        ComService,
        NgZone
      ],
    },
    ...!environment.docker && environment.mockBackend ? mockInterceptors : [],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

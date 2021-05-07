import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ReactiveFormsModule } from '@angular/forms';
import { appInitializer } from './services/app-init';
import { AuthenticationService } from './services/authentication.service';
import { NgHcaptchaModule } from 'ng-hcaptcha';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fakeAuthBackendProvider } from './interceptors/mock-backend';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DividerModule,
    MessagesModule,
    MessageModule,
    NgHcaptchaModule.forRoot({
      siteKey: '43e30bd3-e4c7-43e3-bdc6-e2171ce603e5'
    })
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
  ],
})
export class AuthModule { }

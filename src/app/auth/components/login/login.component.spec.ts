import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { click } from '../../../../testing';

import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication.service';
import { CardModule } from 'primeng/card';
import { Observable, Subscription, throwError } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let page: Page;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      login: (_username: string, _password: string): Observable<User> => {
        const user: User = {
          username: 'test',
          lastName: '',
          firstName: '',
          id: 1
        };
        
        return of(user);
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        CardModule,
        MessagesModule,
        MessageModule,
        NoopAnimationsModule
      ],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        AuthenticationService,
        {provide: AuthenticationService, useValue: mockAuthService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    const wrongLogin = "login";

    page.loginInput.value = wrongLogin;

    page.loginInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.loginForm.dirty).toBe(true, 'login form is dirty');
    expect(component.loginForm.get('username')?.value).toBe(wrongLogin, 'login is filled with login');

    click(page.loginBtn);

    expect(component.loginForm.valid).toBe(false, 'login form is invalid');
  });

  it('onSubmit should be called', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit');

    click(page.loginBtn);

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('onSubmit should call login from AuthenticationService', () => {    
    spyOn(mockAuthService, 'login').and.callThrough();

    const login = "test";
    const password = "test";

    fixture.componentInstance.loginForm.get('username')?.setValue(login);
    fixture.componentInstance.loginForm.get('password')?.setValue(password);
    
    fixture.componentInstance.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalled();
  });

  it('redirect to / after login', inject([Router], (router: Router) => {
    spyOn(mockAuthService, 'login').and.callThrough();
    spyOn(router, 'navigate');

    const login = "test";
    const password = "test";

    fixture.componentInstance.loginForm.get('username')?.setValue(login);
    fixture.componentInstance.loginForm.get('password')?.setValue(password);
    
    fixture.componentInstance.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('show error after unsuccessful login', () => {
    spyOn(mockAuthService, 'login').and.returnValue(throwError({message: 'Wrong username or password'}));

    const login = "wrongLogin";
    const password = "test";

    fixture.componentInstance.loginForm.get('username')?.setValue(login);
    fixture.componentInstance.loginForm.get('password')?.setValue(password);
    
    fixture.componentInstance.onSubmit();
    fixture.detectChanges();

    expect(fixture.componentInstance.errors.length).toBe(1, 'there should be an error after unsuccessful login');
    expect(page.errorMessageBox).toBeTruthy();
  });

  class Page {
    get loginInput() {
      return document.getElementById('username') as HTMLInputElement;
    }

    get passwordInput() {
      return this.query<HTMLInputElement>('.p-password-input')
    }

    get loginBtn() {
      return this.query<HTMLButtonElement>('.p-button');
    }

    get errorMessageBox() {
      return this.query<HTMLDivElement>('.p-message-wrapper');
    }

    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }
  }
});


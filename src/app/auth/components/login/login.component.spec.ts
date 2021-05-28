import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from '../../../../testing';

import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { AuthenticationService } from '../../services/authentication.service';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        CardModule
      ],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        AuthenticationService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
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

  it('login should be unsuccessful', () => {
    const wrongLogin = "login";
    const wrongPassword = "password";

    page.loginInput.value = wrongLogin;
    page.passwordInput.value = wrongPassword;

    page.loginInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    click(page.loginBtn);

    expect(component.errors.length).toBe(1, 'unsuccessfull');
    expect(fixture.debugElement.query(By.css('p-message-wrapper'))).toBeDefined('login error appears');
  })

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

    constructor(fixture: ComponentFixture<LoginComponent>) {
    }

    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }
  }
});


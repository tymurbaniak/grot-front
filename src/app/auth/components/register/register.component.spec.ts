import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RegistrationService } from '../../services/registration.service';
import { click } from '../../../../testing';

import { RegisterComponent } from './register.component';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let page: Page;
  let mockRegistrationService: any;

  beforeEach(async () => {
    mockRegistrationService = {
      register: (_username: string, _password: string): Observable<User> => {
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
      declarations: [
        RegisterComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,        
        ReactiveFormsModule,
        PasswordModule,
        InputTextModule,
        CardModule
      ],
      providers: [
        RegistrationService,
        FormBuilder,
        {provide: RegistrationService, useValue: mockRegistrationService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('wrong email', () => {
    const username = "test";
    const email = "test"
    const password1 = "Test1234!";
    const password2 = "Test1234!";

    page.usernameInput.value = username;
    page.usernameInput.dispatchEvent(new Event('input'));
    page.emailInput.value = email;
    page.emailInput.dispatchEvent(new Event('input'));
    page.password1Input.value = password1;
    page.password1Input.dispatchEvent(new Event('input'));
    page.password2Input.value = password2;
    page.password2Input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.registerForm.dirty).toBe(true, 'register form is dirty');
    expect(component.registerForm.get('email')?.invalid).toBe(true, 'invalid email');
  });

  it('not strong enough password', () => {
    const username = "test";
    const email = "test@wp.pl"
    const password1 = "test";
    const password2 = "test";

    page.usernameInput.value = username;
    page.usernameInput.dispatchEvent(new Event('input'));
    page.emailInput.value = email;
    page.emailInput.dispatchEvent(new Event('input'));
    page.password1Input.value = password1;
    page.password1Input.dispatchEvent(new Event('input'));
    page.password2Input.value = password2;
    page.password2Input.dispatchEvent(new Event('input'));    

    expect(component.registerForm.dirty).toBe(true, 'register form is dirty');
    expect(component.registerForm.invalid).toBe(true, 'register form is invalid');
    expect(component.registerForm.errors).toEqual({ wrongPassword: { strengthOk: false } }, 'password is not strong enough');
  });

  it('password1 and password2 does not match', () => {
    const username = "test";
    const email = "test@wp.pl"
    const password1 = "Test1234!";
    const password2 = "Test1234!2";

    page.usernameInput.value = username;
    page.usernameInput.dispatchEvent(new Event('input'));
    page.emailInput.value = email;
    page.emailInput.dispatchEvent(new Event('input'));
    page.password1Input.value = password1;
    page.password1Input.dispatchEvent(new Event('input'));
    page.password2Input.value = password2;
    page.password2Input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.registerForm.dirty).toBe(true, 'register form is dirty');
    expect(component.registerForm.invalid).toBe(true, 'register form is invalid');
    expect(component.registerForm.errors).toEqual({ wrongPassword: { doesNotMatch: true } }, 'passwords does not match');
  });

  it('onSubmit should be called', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit');
    const username = "test";
    const email = "test@wp.pl"
    const password1 = "Test1234!";
    const password2 = "Test1234!";

    page.usernameInput.value = username;
    page.usernameInput.dispatchEvent(new Event('input'));
    page.emailInput.value = email;
    page.emailInput.dispatchEvent(new Event('input'));
    page.password1Input.value = password1;
    page.password1Input.dispatchEvent(new Event('input'));
    page.password2Input.value = password2;
    page.password2Input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    click(page.registerBtn);

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('onSubmit should call register from RegistrationService', () => {
    spyOn(mockRegistrationService, 'register').and.callThrough();

    const username = "test";
    const email = "test@wp.pl"
    const password1 = "Test1234!";
    const password2 = "Test1234!";

    fixture.componentInstance.registerForm.get('username')?.setValue(username);
    fixture.componentInstance.registerForm.get('email')?.setValue(email);
    fixture.componentInstance.registerForm.get('password1')?.setValue(password1);
    fixture.componentInstance.registerForm.get('password2')?.setValue(password2);
    
    fixture.componentInstance.onSubmit();

    expect(mockRegistrationService.register).toHaveBeenCalled();
  });

  it('redirect to / after registration', inject([Router], (router: Router) => {
    spyOn(mockRegistrationService, 'register').and.callThrough();
    spyOn(router, 'navigate');

    const username = "test";
    const email = "test@wp.pl"
    const password1 = "Test1234!";
    const password2 = "Test1234!";

    fixture.componentInstance.registerForm.get('username')?.setValue(username);
    fixture.componentInstance.registerForm.get('email')?.setValue(email);
    fixture.componentInstance.registerForm.get('password1')?.setValue(password1);
    fixture.componentInstance.registerForm.get('password2')?.setValue(password2);
    
    fixture.componentInstance.onSubmit();

    expect(mockRegistrationService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  class Page {
    get usernameInput() {
      return document.getElementById('username') as HTMLInputElement;
    }

    get password1Input() {
      return this.query<HTMLInputElement>('#password1 > div > input')
    }

    get password2Input() {
      return this.query<HTMLInputElement>('#password2 > div > input')
    }

    get emailInput() {
      return document.getElementById('email') as HTMLInputElement;
    }

    get registerBtn() {
      return this.query<HTMLButtonElement>('button');
    }

    get errorMessageBox() {
      return this.query<HTMLDivElement>('.p-message-wrapper');
    }

    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }
  }
});

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { RegistrationService } from '../../services/registration.service';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Registration } from '../../models/registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', Validators.required],
    password2: ['', Validators.required]
  }, { validators: passwordalidator });

  public loading = false;
  public errors: Message[] = [];
  public environment = environment;
  public submited = false;

  public allowSubmit = false;
  public captchaToken = '';
  public returnUrl = '/';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationServce: RegistrationService
  ) { }

  ngOnInit(): void {
    this.allowSubmit = !environment.captcha;
  }

  get f() { return this.registerForm.controls; }

  public onSubmit(): void {
    this.errors = [];
    this.submited = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const registraiontData: Registration = {
      username: this.f.username.value,
      password: this.f.password1.value,
      email: this.f.email.value,
      captchaToken: this.captchaToken
    };

    this.registrationServce.register(registraiontData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.errors.push({ severity: 'error', summary: 'Error', detail: error });
          this.loading = false;
          console.error(error);
        }
      });
  }

  public onVerify(token: string) {
    this.allowSubmit = true;
    this.captchaToken = token;
  }

  public onExpired(_response: any) {
    this.allowSubmit = false;
  }

  public onError(_error: any) {
    this.allowSubmit = false;
  }
}

export const passwordalidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password1 = control.get('password1')?.value;
  const password2 = control.get('password2')?.value;

  const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  const strengthOk = passwordRegExp.test(password1);

  if(password1 && password2 && !(password1 === password2)){
    return { wrongPassword: { doesNotMatch: true } }
  }

  if(!strengthOk){
    return { wrongPassword: { strengthOk: false } }
  }
  return null;
};
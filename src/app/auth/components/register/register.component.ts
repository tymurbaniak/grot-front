import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { RegistrationService } from '../../services/registration.service';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required]
  });

  public submitted = false;
  public loading = false;
  public errors: Message[] = [];
  public environment = environment;
  
  public allowSubmit = false;
  public captchaToken = '';
  public returnUrl = '/';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationServce: RegistrationService
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  public onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.registrationServce.register(this.f.username.value, this.f.password1.value, this.f.email.value, this.captchaToken)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.errors.push({ severity: 'error', summary: 'Error', detail: error.message });
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorMsgLogin: string;
  errorMsgSignup: string;
  errorSubsSignup: Subscription;
  errorSubsLogin: Subscription;

  Registerform = new FormGroup({
    nationalCode: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    MobileNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  LoginForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required])
  });

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
      this.LoginForm.reset();
    });
    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
      this.Registerform.reset();
    });
  }
  get nationalCode() {
    return this.Registerform.get('nationalCode');
  }
  get firstName() {
    return this.Registerform.get('firstName');
  }
  get lastName() {
    return this.Registerform.get('lastName');
  }
  get MobileNumber() {
    return this.Registerform.get('MobileNumber');
  }
  get password() {
    return this.Registerform.get('password');
  }
  get confirmPassword() {
    return this.Registerform.get('confirmPassword');
  }

  get Username() {
    return this.LoginForm.get('Username');
  }
  get Password() {
    return this.LoginForm.get('Password');
  }

  register() {
    this.registerService.signUp(this.Registerform.getRawValue());
    this.errorSubsSignup = this.registerService.getErrorSignUp().subscribe(res => {
      this.errorMsgSignup = res;
    });
  }

  login() {
    this.registerService.signIn(this.LoginForm.getRawValue());
    this.errorSubsLogin = this.registerService.getErrorLogin().subscribe(res => {
      this.errorMsgLogin = res;
    });
  }
  ngOnDestroy(): void {
    if (this.errorSubsLogin && !this.errorSubsLogin.closed) this.errorSubsLogin.unsubscribe();
    if (this.errorSubsSignup && !this.errorSubsSignup.closed) this.errorSubsSignup.unsubscribe();
  }
}


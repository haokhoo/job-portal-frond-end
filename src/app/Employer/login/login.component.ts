import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload, } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validatingFormLogin: FormGroup;
  validatingFormRegister: FormGroup;

  logindetails: TokenPayload = {
    name: "",
    email: "",
    password: ""
  }

  resigterdetails: TokenPayload = {
    name: "",
    email: "",
    password: ""
  }

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.validatingFormLogin = new FormGroup({
      loginFormModalEmail: new FormControl('', [Validators.required, Validators.email],),
      loginFormModalPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.validatingFormRegister = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', [Validators.required, Validators.email]),
      signupFormModalPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  get loginFormModalEmail() {
    return this.validatingFormLogin.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingFormLogin.get('loginFormModalPassword');
  }

  get signupFormModalName() {
    return this.validatingFormRegister.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.validatingFormRegister.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingFormRegister.get('signupFormModalPassword');
  }

  login() {
    this.auth.eLogin(this.logindetails).subscribe(
      () => {
        this.auth.showSuccess("Login Successful");
        this.router.navigateByUrl('/employer')
      },
      error => {
        if (error.error.error) {
          if (error.error.error.email) {
            this.auth.showError(error.error.error.email);
          }
          if (error.error.error.password) {
            this.auth.showError(error.error.error.password);
          }
        } else {
          this.auth.showError(error.error.message);
        }
      });
  }

  register() {
    this.auth.eRegister(this.resigterdetails).subscribe(
      () => {
        this.auth.showSuccess("Register Successful");
        window.location.reload()
      },
      error => {
        if (error.error.error) {
          if (error.error.error.name) {
            this.auth.showError(error.error.error.name);
          }
          if (error.error.error.email) {
            this.auth.showError(error.error.error.email);
          }
          if (error.error.error.password) {
            this.auth.showError(error.error.error.password);
          }
        }
      }
    )
  }

}

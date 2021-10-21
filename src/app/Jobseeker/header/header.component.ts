import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService, TokenPayload, } from 'src/app/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  constructor(public auth: AuthenticationService) {
  }

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
  };

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
    this.auth.login(this.logindetails).subscribe(
      () => {
        this.auth.showSuccess("Login Successful");
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
    this.auth.register(this.resigterdetails).subscribe(
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

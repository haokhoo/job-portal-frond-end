import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Profile } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  validateProfile: FormGroup;
  profile: Profile = {
    fullname: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    summary: ""
  }

  getProfile: Profile
  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.profileForm()
    this.auth.getProfile().subscribe(
      profile => {
        this.getProfile = profile[0]

        if (this.getProfile) {
          this.profile = profile[0]
        }
      }
    )
  }

  profileForm() {
    this.validateProfile = new FormGroup({
      fullname: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.email, Validators.required]),
      address1: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      postal: new FormControl('', [Validators.minLength(5), Validators.maxLength(5), Validators.required, Validators.pattern("^[0-9]*$")]),
      summary: new FormControl('', Validators.required)
    });
  }

  get fullname() {
    return this.validateProfile.get('fullname');
  }

  get phone() {
    return this.validateProfile.get('phone');
  }

  get email() {
    return this.validateProfile.get('email');
  }

  get address1() {
    return this.validateProfile.get('address1');
  }

  get address2() {
    return this.validateProfile.get('address2');
  }

  get city() {
    return this.validateProfile.get('city');
  }

  get state() {
    return this.validateProfile.get('state');
  }

  get postal() {
    return this.validateProfile.get('postal');
  }

  get country() {
    return this.validateProfile.get('country');
  }

  get summary() {
    return this.validateProfile.get('summary');
  }

  addProfile() {
    this.auth.addProfile(this.profile).subscribe(
      () => {
        this.auth.showSuccess("Profile add Successful");
        window.location.reload()
      },
      error => {
        if (error.error.error) {
          if (error.error.error.fullname) {
            this.auth.showError(error.error.error.fullname);
          }
          if (error.error.error.phone) {
            this.auth.showError(error.error.error.phone);
          }
          if (error.error.error.email) {
            this.auth.showError(error.error.error.email);
          }
          if (error.error.error.address1) {
            this.auth.showError(error.error.error.address1);
          }
          if (error.error.error.address2) {
            this.auth.showError(error.error.error.address2);
          }
          if (error.error.error.city) {
            this.auth.showError(error.error.error.city);
          }
          if (error.error.error.state) {
            this.auth.showError(error.error.error.state);
          }
          if (error.error.error.postal) {
            this.auth.showError(error.error.error.postal);
          }
          if (error.error.error.country) {
            this.auth.showError(error.error.error.country);
          }
          if (error.error.error.summary) {
            this.auth.showError(error.error.error.summary);
          }
        }
      });
  }

  updateProfile() {
    this.auth.updateProfile(this.profile).subscribe(
      () => {
        this.auth.showSuccess("Profile update Successful");
        window.location.reload()
      },
      error => {
        if (error.error.error) {
          if (error.error.error.fullname) {
            this.auth.showError(error.error.error.fullname);
          }
          if (error.error.error.phone) {
            this.auth.showError(error.error.error.phone);
          }
          if (error.error.error.email) {
            this.auth.showError(error.error.error.email);
          }
          if (error.error.error.address1) {
            this.auth.showError(error.error.error.address1);
          }
          if (error.error.error.address2) {
            this.auth.showError(error.error.error.address2);
          }
          if (error.error.error.city) {
            this.auth.showError(error.error.error.city);
          }
          if (error.error.error.state) {
            this.auth.showError(error.error.error.state);
          }
          if (error.error.error.postal) {
            this.auth.showError(error.error.error.postal);
          }
          if (error.error.error.country) {
            this.auth.showError(error.error.error.country);
          }
          if (error.error.error.summary) {
            this.auth.showError(error.error.error.summary);
          }
        }
      });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService, Company, Logo } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FileValidator } from 'src/app/file-input.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companydetails-add',
  templateUrl: './companydetails-add.component.html',
  styleUrls: ['./companydetails-add.component.scss']
})
export class CompanydetailsAddComponent implements OnInit {
  validateCompany: FormGroup;
  validateLogo: FormGroup;

  company: Company = {
    company_name: "",
    website: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    overview: "",
    logo: "",
    id: ""
  }

  getlogo: Logo = {
    logo: ""
  }

  getCompany: Company

  constructor(public auth: AuthenticationService, private _cdr: ChangeDetectorRef, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.companyForm()
    this.auth.getCompany().subscribe(
      company => {
        this.getCompany = company

        if (this.getCompany) {
          this.company = company
        }
      }
    )
  }

  companyForm() {
    this.validateCompany = new FormGroup({
      company_name: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]),
      address1: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postal: new FormControl('', [Validators.minLength(5), Validators.maxLength(5), Validators.required, Validators.pattern("^[0-9]*$")]),
      overview: new FormControl('', Validators.required)
    });

    this.validateLogo = new FormGroup({
      logo: new FormControl('', [FileValidator.validate])
    });
  }

  get company_name() {
    return this.validateCompany.get('company_name');
  }

  get website() {
    return this.validateCompany.get('website');
  }

  get email() {
    return this.validateCompany.get('email');
  }

  get phone() {
    return this.validateCompany.get('phone');
  }

  get address1() {
    return this.validateCompany.get('address1');
  }

  get address2() {
    return this.validateCompany.get('address2');
  }

  get city() {
    return this.validateCompany.get('city');
  }

  get state() {
    return this.validateCompany.get('state');
  }

  get postal() {
    return this.validateCompany.get('postal');
  }

  get overview() {
    return this.validateCompany.get('overview');
  }

  get logo() {
    return this.validateLogo.get('logo');
  }

  fileEvent(e) {
    this.getlogo.logo = e.target.files[0];
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.validateLogo.patchValue({
          file: reader.result
        });

        this._cdr.markForCheck();
      };
    }
  }

  onSubmit(f: any) {
    const myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('company_name', this.company.company_name);
    myFormData.append('website', this.company.website);
    myFormData.append('email', this.company.email);
    myFormData.append('phone', this.company.phone);
    myFormData.append('address1', this.company.address1);
    myFormData.append('address2', this.company.address2);
    myFormData.append('city', this.company.city);
    myFormData.append('state', this.company.state);
    myFormData.append('postal', this.company.postal);
    myFormData.append('overview', this.company.overview);
    this.http.post('/api/companies', myFormData, {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      }
    }).subscribe(data => {
      this.auth.showSuccess("Company upload Successful");
      this.router.navigateByUrl('employer/panel/details')
    },
      error => {
        if (error.error.error) {
          if (error.error.error.company_name) {
            this.auth.showError(error.error.error.company_name);
          }
          if (error.error.error.website) {
            this.auth.showError(error.error.error.website);
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
          if (error.error.error.overview) {
            this.auth.showError(error.error.error.overview);
          }
        }
      });
  }

  onUpdate() {
    this.auth.updateCompany(this.company).subscribe(
      () => {
        this.auth.showSuccess("Company upload Successful");
        this.router.navigateByUrl('employer/panel/details')
      },
      error => {
        if (error.error.error) {
          if (error.error.error.company_name) {
            this.auth.showError(error.error.error.company_name);
          }
          if (error.error.error.website) {
            this.auth.showError(error.error.error.website);
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
          if (error.error.error.overview) {
            this.auth.showError(error.error.error.overview);
          }
        }
      });
  }


  submit(f: any) {
    const myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('logo', this.getlogo.logo);
    this.http.post('/api/logo', myFormData, {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      }
    }).subscribe(data => {
      this.auth.showSuccess("Logo upload Successful.");
      this.router.navigateByUrl('employer/panel/details')
    },
      error => {
        if (error.error.error) {
          if (error.error.error.logo) {
            this.auth.showError(error.error.error.logo);
          }
        }
      });
  }

  back() {
    this.router.navigateByUrl('employer/panel/details')
  }
}


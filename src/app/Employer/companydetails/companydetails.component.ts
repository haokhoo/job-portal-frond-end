import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService, Company } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FileValidator } from 'src/app/file-input.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.scss']
})
export class CompanydetailsComponent implements OnInit {
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

  getCompany: Company

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getCompany().subscribe(
      company => {
        this.getCompany = company

        if (this.getCompany) {
          this.company = company
        }
      }
    )
  }

  toAddPage(){
    this.router.navigateByUrl('employer/panel/details/actions')
  }
}

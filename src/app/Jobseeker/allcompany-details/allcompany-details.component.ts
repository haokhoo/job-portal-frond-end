import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Company, eJob, FavouriteCompany } from 'src/app/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allcompany-details',
  templateUrl: './allcompany-details.component.html',
  styleUrls: ['./allcompany-details.component.scss']
})
export class AllcompanyDetailsComponent implements OnInit {
  company: Company = {
    company_name: '',
    website: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal: '',
    overview: '',
    logo: '',
    id: undefined
  }

  fcompany: FavouriteCompany = {
    company_id: '',
    id: '',
    logo: '',
    company_name: ''
  }

  eJob: eJob[]

  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.auth.getOneCompanies(this.route.snapshot.params.id).subscribe(
      company => {
        this.company = company[0]
        this.auth.getCompanyJobs(this.company.id).subscribe(
          job => {
            this.eJob = job
          }
        )
      }
    )
  }

  back() {
    this.router.navigateByUrl('/company')
  }

  addfcompany(){
    this.auth.addfcompany(this.company.id, this.fcompany).subscribe(
      () => {
        this.auth.showSuccess("Save this company Successully!")
      },
      () => {
        this.auth.showError("Something Error!")
      }
    )
  }

}

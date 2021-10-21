import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Company } from 'src/app/authentication.service';

@Component({
  selector: 'app-allcompany',
  templateUrl: './allcompany.component.html',
  styleUrls: ['./allcompany.component.scss']
})
export class AllcompanyComponent implements OnInit {
  companies: Company[]

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getCompanies().subscribe(
      companies => {
        this.companies = companies
      }
    )
  }
}

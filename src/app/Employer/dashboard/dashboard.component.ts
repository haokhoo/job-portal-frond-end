import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }
  jlength: any
  alength: any
  rlength: any
  qlength: any

  company_id: any
  ngOnInit(): void {
    this.auth.getJobsCount().subscribe(
      ejob => {
        this.jlength = ejob.length
      }
    )

    this.auth.getCompany().subscribe(
      company => {
        this.company_id = company.id
        this.auth.getApplicantsDashboard(this.company_id).subscribe(
          applicant => {
            this.alength = applicant.length
          }
        )

        this.auth.getReview(this.company_id).subscribe(
          review => {
            this.rlength = review.length
          }
        )

        this.auth.getNewQuestion(this.company_id).subscribe(
          question => {
            this.qlength = question.length
          }
        )
      }
    )
  }

}

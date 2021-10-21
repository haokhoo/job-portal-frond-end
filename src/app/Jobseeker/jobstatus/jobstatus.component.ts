import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob } from 'src/app/authentication.service';

@Component({
  selector: 'app-jobstatus',
  templateUrl: './jobstatus.component.html',
  styleUrls: ['./jobstatus.component.scss']
})
export class JobstatusComponent implements OnInit {
  pendingJob: eJob[]
  approveJob: eJob[]


  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getApplicantPending().subscribe(
      job => {
        this.pendingJob = job
      }
    )

    this.auth.getApplicantApproval().subscribe(
      job => {
        this.approveJob = job
      }
    )
  }

}

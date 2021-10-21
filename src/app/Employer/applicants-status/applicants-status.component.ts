import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob } from 'src/app/authentication.service';

@Component({
  selector: 'app-applicants-status',
  templateUrl: './applicants-status.component.html',
  styleUrls: ['./applicants-status.component.scss']
})
export class ApplicantsStatusComponent implements OnInit {
  pendingJob: eJob[]
  approveJob: eJob[]
  removeJob: eJob[]
  
  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getPendingJob().subscribe(
      job => {
        this.pendingJob = job
      }
    )

    this.auth.getApproveJob().subscribe(
      job => {
        this.approveJob = job
      }
    )

    this.auth.getRemoveJob().subscribe(
      job => {
        this.removeJob = job
      }
    )
  }

}
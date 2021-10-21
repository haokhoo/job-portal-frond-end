import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob } from 'src/app/authentication.service';

@Component({
  selector: 'app-jobmanage',
  templateUrl: './jobmanage.component.html',
  styleUrls: ['./jobmanage.component.scss']
})
export class JobmanageComponent implements OnInit {
  pendingJob: eJob[]
  approveJob: eJob[]
  removeJob: eJob[]
  id: any
  action: eJob = {
    id: '',
    company_id: '',
    title: '',
    desc: '',
    budget: '',
    category: '',
    position_type: '',
    status: '',
    company_name: '',
    state: '',
    updated_at: ''
  }

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

  removeEJob(id: String) {
    this.auth.removeEJob(id,this.action).subscribe(
      () => {
        this.auth.showSuccess("Job remove Successful");
        window.location.reload()
      },
      () => {
        this.auth.showError("Something Error!")
      });
  }

  recoverEJob(id: String) {
    this.auth.recoverEJob(id,this.action).subscribe(
      () => {
        this.auth.showSuccess("Job recovered Successful. Please wait for admin approval!");
        window.location.reload()
      },
      () => {
        this.auth.showError("Something Error!")
      });
  }

}

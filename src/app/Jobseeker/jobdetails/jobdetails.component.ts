import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob, apJob, FavouriteJob } from 'src/app/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})
export class JobdetailsComponent implements OnInit {
  eJob: eJob = {
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

  apjob: apJob = {
    id: '',
    company_id: ''
  }

  fejob: FavouriteJob = {
    job_epy_id: '',
    job_jsk_id: '',
    title: '',
    desc: '',
    budget: '',
    category: '',
    position_type: '',
    company_name: '',
    state: '',
    updated_at: '',
    id: ''
  }
  
  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.auth.getOneEJobs(this.route.snapshot.params.id).subscribe(
      job => {
        this.eJob = job[0]
        this.apjob.id = job[0].id
        this.apjob.company_id = job[0].company_id
      }
    )
  }

  back() {
    this.router.navigateByUrl('/')
  }

  view() {
    let url: string = '/company/' + this.apjob.company_id
    this.router.navigateByUrl(url)
  }


  apply() {
    this.auth.applyEJob(this.apjob.id, this.apjob).subscribe(
      () => {
        this.auth.showSuccess("Apply Successfull, Please wait for the response.")
      },
      () => {
        this.auth.showError("Please fill in your profile information before your apply the job!")
      });
      
  }

  addfejob(){
    this.auth.addfejob(this.apjob.id, this.fejob).subscribe(
      () => {
        this.auth.showSuccess("Save this job Successully!")
      },
      () => {
        this.auth.showError("Something Error!")
      }
    )
  }
}


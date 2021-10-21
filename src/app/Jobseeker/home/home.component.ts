import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob, apJob, FavouriteJob } from 'src/app/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eJob: eJob[]
  hide: boolean = false
  opJob: eJob[]
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

  id: string
  company_id: string
  title: string
  desc: string
  budget: string
  category: string
  position_type: string
  company_name: string
  state: string
  updated_at: string


  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getEJob().subscribe(
      job => {
        this.eJob = job
        this.opJob = job
      }
    )
  }

  openJob(id: any) {
    this.hide = true
    this.id = this.opJob[id].id
    this.company_id = this.opJob[id].company_id
    this.title = this.opJob[id].title
    this.desc = this.opJob[id].desc
    this.budget = this.opJob[id].budget
    this.category = this.opJob[id].category
    this.position_type = this.opJob[id].position_type
    this.company_name = this.opJob[id].company_name
    this.state = this.opJob[id].state
    this.updated_at = this.opJob[id].updated_at
  }

  apply() {
    this.apjob.id = this.id
    this.apjob.company_id = this.company_id
    this.auth.applyEJob(this.id, this.apjob).subscribe(
      () => {
        this.auth.showSuccess("Apply Successfull, Please wait for the response.")
      },
      () => {
        this.auth.showError("Please login before you apply a job!")
      });
  }

  addfejob(){
    this.auth.addfejob(this.id, this.fejob).subscribe(
      () => {
        this.auth.showSuccess("Add favaorite Successully!")
      },
      () => {
        this.auth.showError("Something Error!")
      }
    )
  }

}

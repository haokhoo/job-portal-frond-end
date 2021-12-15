import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob, apJob, Applicant, Education, Skill, Experience } from 'src/app/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicants-display',
  templateUrl: './applicants-display.component.html',
  styleUrls: ['./applicants-display.component.scss']
})
export class ApplicantsDisplayComponent implements OnInit {
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
  applicants: Applicant

  education: Education
  skill: Skill
  exp: Experience

  apjob: apJob = {
    id: '',
    company_id: ''
  }


  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.auth.getOneEJobs(this.route.snapshot.params.id).subscribe(
      job => {
        this.eJob = job[0]
        this.apjob.id = job[0].id
        this.apjob.company_id = job[0].company_id

        this.auth.getApplicantsApproved(this.apjob.id,this.apjob.company_id).subscribe(
          applicants => {
            this.applicants = applicants
          }
        )
      }
    )
  }

  back() {
    this.router.navigateByUrl('/employer/panel/applicant')
  }

  get(id:any){
    this.auth.getProfileEducation(id).subscribe(
      education => {
        this.education = education
      }
    )

    this.auth.getProfileSkill(id).subscribe(
      skill => {
        this.skill = skill
      }
    )

    this.auth.getProfileExp(id).subscribe(
      exp => {
        this.exp = exp
      }
    )
  }
}

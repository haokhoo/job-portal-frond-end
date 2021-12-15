import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob, apJob, Applicant, Education, Skill, Experience } from 'src/app/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {
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

  applicants: Applicant

  education: Education
  skill: Skill
  exp: Experience

  action: Applicant = {
    job_epy_job: '',
    company_id: '',
    job_jsk_job: '',
    jsk_id: '',
    status: ''
  }

  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.auth.getOneEJobs(this.route.snapshot.params.id).subscribe(
      job => {
        this.eJob = job[0]
        this.apjob.id = job[0].id
        this.apjob.company_id = job[0].company_id

        this.auth.getApplicants(this.apjob.id,this.apjob.company_id).subscribe(
          applicants => {
            this.applicants = applicants
          }
        )

        
      }
    )
  }

  back() {
    this.router.navigateByUrl('/employer/panel/manage')
  }

  approveApplicant(id: String){
    this.auth.approveApplicant(id,this.action).subscribe(
      () => {
        this.auth.showSuccess("Shortlisted Successful.");
        window.location.reload()
      },
      () => {
        this.auth.showError("Something Error!")
      });
  }

  rejectApplicant(id: String) {
    this.auth.rejectApplicant(id,this.action).subscribe(
      () => {
        this.auth.showSuccess("Rejected Successful.");
        window.location.reload()
      },
      () => {
        this.auth.showError("Something Error!")
      });
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

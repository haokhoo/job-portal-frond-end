import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Experience } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-experience-update',
  templateUrl: './experience-update.component.html',
  styleUrls: ['./experience-update.component.scss']
})
export class ExperienceUpdateComponent implements OnInit {
  validateExperience: FormGroup;
  experience: Experience = {
    job_title: "",
    employer: "",
    start_date: "",
    end_date: "",
    id: ""
  }

  getExperience: Experience = {
    job_title: "",
    employer: "",
    start_date: "",
    end_date: "",
    id: ""
  }

  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.experienceForm()
    this.auth.getOneExperience(this.route.snapshot.params.id).subscribe(
      experience => {
        this.experience = experience[0]
      }
    )
  }

  experienceForm() {
    this.validateExperience = new FormGroup({
      job_title: new FormControl('', Validators.required),
      employer: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required)
    });
  }

  get job_title() {
    return this.validateExperience.get('job_title');
  }

  get employer() {
    return this.validateExperience.get('employer');
  }

  get start_date() {
    return this.validateExperience.get('start_date');
  }

  get end_date() {
    return this.validateExperience.get('end_date');
  }

  updateExperience() {
    this.auth.updateExperience(this.route.snapshot.params.id, this.validateExperience.value).subscribe(
      () => {
        this.auth.showSuccess("Experience update Successful");
        this.router.navigateByUrl('/profile')
      },
      error => {
        if (error.error.error) {
          if (error.error.error.job_title) {
            this.auth.showError(error.error.error.job_title);
          }
          if (error.error.error.employer) {
            this.auth.showError(error.error.error.employer);
          }
          if (error.error.error.start_date) {
            this.auth.showError(error.error.error.start_date);
          }
          if (error.error.error.end_date) {
            this.auth.showError(error.error.error.end_date);
          }
        }
      });
  }

  back() {
    this.router.navigateByUrl('/profile')
  }

}

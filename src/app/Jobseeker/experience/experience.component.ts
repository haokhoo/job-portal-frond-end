import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Experience } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  validateExperience: FormGroup;
  experience: Experience = {
    job_title: "",
    employer: "",
    start_date: "",
    end_date: "",
    id: ""
  }

  getExperience: Experience[]

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.experienceForm()
    this.auth.getExperience().subscribe(
      experience => {
        this.getExperience = experience
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

  addExperience() {
    this.auth.addExperience(this.experience).subscribe(
      () => {
        this.auth.showSuccess("Experience add Successful");
        window.location.reload()
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

  deleteExperience(id: String): void {
    this.auth.deleteExperience(id).subscribe(
      experience => {
        this.auth.showSuccess("Experience delete Successful");
        window.location.reload()
      });
  }
}

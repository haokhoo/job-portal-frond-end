import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Education } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  validateEducation: FormGroup;
  education: Education = {
    school: "",
    course: "",
    result: "",
    start_date: "",
    end_date: "",
    id: ""
  }


  getEducation: Education[]

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.educationForm()
    this.auth.getEducation().subscribe(
      education => {
        this.getEducation = education
      }
    )
  }

  educationForm() {
    this.validateEducation = new FormGroup({
      school: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
      result: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required)
    });
  }

  get school() {
    return this.validateEducation.get('school');
  }

  get course() {
    return this.validateEducation.get('course');
  }

  get result() {
    return this.validateEducation.get('result');
  }

  get start_date() {
    return this.validateEducation.get('start_date');
  }

  get end_date() {
    return this.validateEducation.get('end_date');
  }

  addEducation() {
    this.auth.addEducation(this.education).subscribe(
      () => {
        this.auth.showSuccess("Education add Successful");
        window.location.reload()
      },
      error => {
        if (error.error.error) {
          if (error.error.error.school) {
            this.auth.showError(error.error.error.school);
          }
          if (error.error.error.course) {
            this.auth.showError(error.error.error.course);
          }
          if (error.error.error.result) {
            this.auth.showError(error.error.error.result);
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

  deleteEducation(id: String): void {
    this.auth.deleteEducation(id).subscribe(
      education => {
        this.auth.showSuccess("Education delete Successful");
        window.location.reload()
      });
  }
}

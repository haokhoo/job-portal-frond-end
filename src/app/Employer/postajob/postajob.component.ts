import { Component, OnInit } from '@angular/core';
import { AuthenticationService, eJob, Company } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postajob',
  templateUrl: './postajob.component.html',
  styleUrls: ['./postajob.component.scss']
})
export class PostajobComponent implements OnInit {
  validateJob: FormGroup;
  eJob: eJob = {
    company_id: "",
    title: "",
    desc: "",
    budget: "",
    category: "",
    position_type: "",
    status: "",
    id: '',
    company_name: '',
    state: '',
    updated_at: ''
  }

  getCompany: Company = {
    company_name: "",
    website: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    overview: "",
    logo: "",
    id: ""
  }

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.jobForm()
  }

  jobForm() {
    this.validateJob = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      budget: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      category: new FormControl('', Validators.required),
      position_type: new FormControl('', Validators.required)
    });
  }

  get title() {
    return this.validateJob.get('title');
  }

  get desc() {
    return this.validateJob.get('desc');
  }

  get budget() {
    return this.validateJob.get('budget');
  }

  get category() {
    return this.validateJob.get('category');
  }

  get position_type() {
    return this.validateJob.get('position_type');
  }

  addJob() {
    this.auth.getCompany().subscribe(
      company => {
        if (company == undefined) {
          this.auth.showError("Please fill in company information before you post a job!")
          this.router.navigateByUrl('/employer/panel/details')
        } else {
          this.getCompany.id = company.id
          this.auth.addEJob(this.getCompany.id, this.validateJob.value).subscribe(
            () => {
              this.auth.showSuccess("Job created successfully, please wait for admin approval.");
              window.location.reload()
            },
            error => {
              if (error.error.error) {
                if (error.error.error.title) {
                  this.auth.showError(error.error.error.title);
                }
                if (error.error.error.desc) {
                  this.auth.showError(error.error.error.desc);
                }
                if (error.error.error.budget) {
                  this.auth.showError(error.error.error.budget);
                }
                if (error.error.error.category) {
                  this.auth.showError(error.error.error.category);
                }
                if (error.error.error.position_type) {
                  this.auth.showError(error.error.error.position_type);
                }
              }
            });
        }

      }
    )
  }
}

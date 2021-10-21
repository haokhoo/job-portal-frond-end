import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Skill } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skill-update',
  templateUrl: './skill-update.component.html',
  styleUrls: ['./skill-update.component.scss']
})
export class SkillUpdateComponent implements OnInit {
  validateSkill: FormGroup;
  skill: Skill = {
    name: "",
    rating: "",
    id: ""
  }

  getSkill: Skill = {
    name: "",
    rating: "",
    id: ""
  }

  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.skillForm()
    this.auth.getOneSkill(this.route.snapshot.params.id).subscribe(
      skill => {
        this.skill = skill[0]
      }
    )
  }

  skillForm() {
    this.validateSkill = new FormGroup({
      name: new FormControl('', Validators.required),
      rating: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]*$")])
    });
  }

  get name() {
    return this.validateSkill.get('name');
  }

  get rating() {
    return this.validateSkill.get('rating');
  }

  updateSkill() {
    this.auth.updateSkill(this.route.snapshot.params.id, this.validateSkill.value).subscribe(
      () => {
        this.auth.showSuccess("Skill update Successful");
        this.router.navigateByUrl('/profile')
      },
      error => {
        if (error.error.error) {
          if (error.error.error.name) {
            this.auth.showError(error.error.error.name);
          }
          if (error.error.error.rating) {
            this.auth.showError(error.error.error.rating);
          }
        }
      });
  }

  back() {
    this.router.navigateByUrl('/profile')
  }
}

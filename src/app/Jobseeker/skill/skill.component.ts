import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Skill } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  validateSkill: FormGroup;
  skill: Skill = {
    name: "",
    rating: "",
    id: ""
  }

  getSkill: Skill[]

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.skillForm()
    this.auth.getSkill().subscribe(
      skill => {
        this.getSkill = skill
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

  addSkill() {
    this.auth.addSkill(this.skill).subscribe(
      () => {
        this.auth.showSuccess("Skill add Successful");
        window.location.reload()
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

  deleteSkill(id: String): void {
    this.auth.deleteSkill(id).subscribe(
      skill => {
        this.auth.showSuccess("Skill delete Successful");
        window.location.reload()
      });
  }

}

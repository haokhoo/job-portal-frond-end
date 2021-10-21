import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Question } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-qn-a',
  templateUrl: './qn-a.component.html',
  styleUrls: ['./qn-a.component.scss']
})
export class QnAComponent implements OnInit {
  validateQuestion: FormGroup;
  q:Question = {
    company_id: '',
    question: '',
    status: '',
    id: ''
  }

  getQuestion: Question[]
  company_id: any

  check:boolean
  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.questionForm()
    this.auth.getCompany().subscribe(
      company => {
        this.company_id = company.id
        this.auth.getQuestion(this.company_id).subscribe(
          question => {
            this.getQuestion = question
          }
        )
      }
    )
  }

  questionForm() {
    this.validateQuestion = new FormGroup({
      question: new FormControl('', Validators.required)
    });
  }

  get question() {
    return this.validateQuestion.get('question');
  }

}

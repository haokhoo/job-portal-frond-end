import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Question_Jobs } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qna-job',
  templateUrl: './qna-job.component.html',
  styleUrls: ['./qna-job.component.scss']
})
export class QnaJobComponent implements OnInit {
  validateQuestion: FormGroup;
  q: Question_Jobs = {
    company_id: '',
    question: '',
    jsk_id: '',
    job_epy_id: '',
    id: ''
  }

  getQuestion: Question_Jobs[]
  
  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.questionForm()
    this.auth.getNewQuestionJob(this.route.snapshot.params.id).subscribe(
      question => {
        this.getQuestion = question
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

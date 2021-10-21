import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Question_Jobs } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-job',
  templateUrl: './question-job.component.html',
  styleUrls: ['./question-job.component.scss']
})
export class QuestionJobComponent implements OnInit {
  validateQuestion: FormGroup;
  q:Question_Jobs = {
    company_id: '',
    question: '',
    jsk_id: '',
    job_epy_id: '',
    id: ''
  }

  getQuestion: Question_Jobs[]

  id: any
  answer: any
  created_at: any

  constructor(public auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.questionForm()
    this.auth.getQuestionJob(this.route.snapshot.params.id).subscribe(
      question => {
        this.getQuestion = question
      }
    )
  }
  
  view(id:any){
    this.id = id
    this.answer = ""
    this.created_at = ""
    this.auth.getOneAnswerJob(this.id).subscribe(
      answer => {
        if(answer.length <= 0){
          this.answer = "No answer now."
        }else{
          this.answer = answer[0].answer
          this.created_at = answer[0].created_at
        }
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

  addQuestion() {
    this.auth.addQuestionJob(this.route.snapshot.params.id,this.q).subscribe(
      () => {
        this.auth.showSuccess("Question add Successful");
        window.location.reload()
      },
      error => {
        if (error.error.error) {
          if (error.error.error.question) {
            this.auth.showError(error.error.error.question);
          }
        }
      });
  }

}


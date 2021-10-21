import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Answer_Jobs, Question_Jobs } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qna-job-dialog',
  templateUrl: './qna-job-dialog.component.html',
  styleUrls: ['./qna-job-dialog.component.scss']
})
export class QnaJobDialogComponent implements OnInit {
  validateAnswer: FormGroup;
  a:Answer_Jobs = {
    company_id: '',
    answer: '',
    jsk_id: '',
    question_id: '',
    id: ''
  }

  getQuestion: Question_Jobs = {
    company_id: '',
    question: '',
    jsk_id: '',
    job_epy_id: '',
    id: ''
  }

  created_at: any
  fullname: any
  id: any

  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.answerForm()
    this.auth.getOneQuestionJob(this.route.snapshot.params.id).subscribe(
      question => {
        this.getQuestion = question[0]
        this.fullname = question[0].fullname
        this.created_at = question[0].created_at
        this.id = question[0].job_epy_id

      }
    )
    
  }

  answerForm() {
    this.validateAnswer = new FormGroup({
      answer: new FormControl('', Validators.required)
    });
  }

  get answer() {
    return this.validateAnswer.get('answer');
  }

  addAnswer() {
    this.auth.addAnswerJob(this.route.snapshot.params.id,this.a).subscribe(
      () => {
        this.auth.showSuccess("Answer sent Successful");
        // this.back()
      },
      error => {
        if (error.error.error) {
          if (error.error.error.answer) {
            this.auth.showError(error.error.error.answer);
          }
        }
      });
  }

  back(){
    this.router.navigate(['/employer/panel/manage/' ,this.id])
  }

}
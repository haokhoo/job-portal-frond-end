import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Question, Answer } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qn-a-dialog',
  templateUrl: './qn-a-dialog.component.html',
  styleUrls: ['./qn-a-dialog.component.scss']
})
export class QnADialogComponent implements OnInit {
  validateAnswer: FormGroup;
  a:Answer = {
    company_id: '',
    answer: '',
    jobseeker_id: '',
    id: ''
  }

  getQuestion: Question = {
    company_id: '',
    question: '',
    status: '',
    id: ''
  }

  created_at: any
  fullname: any

  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.answerForm()
    this.auth.getOneQuestion(this.route.snapshot.params.id).subscribe(
      question => {
        this.getQuestion = question[0]
        this.fullname = question[0].fullname
        this.created_at = question[0].created_at

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
    this.auth.addAnswer(this.route.snapshot.params.id,this.a).subscribe(
      () => {
        this.auth.showSuccess("Answer sent Successful");
        this.back()
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
    this.router.navigateByUrl('/employer/panel/qna')
  }

}

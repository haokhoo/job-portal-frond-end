import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Review } from 'src/app/authentication.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  validateReview: FormGroup;
  r:Review = {
    company_id: '',
    review: '',
    status: '',
    id: ''
  }

  getReview: Review[]

  constructor(public auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reviewForm()
    this.auth.getReview(this.route.snapshot.params.id).subscribe(
      review => {
        this.getReview = review
      }
    )
  }

  reviewForm() {
    this.validateReview = new FormGroup({
      review: new FormControl('', Validators.required)
    });
  }

  get review() {
    return this.validateReview.get('review');
  }

  addReview() {
    this.auth.addReview(this.route.snapshot.params.id,this.r).subscribe(
      () => {
        this.auth.showSuccess("Review add Successful");
        window.location.reload()
      },
      error => {
        if (error.error.error) {
          if (error.error.error.review) {
            this.auth.showError(error.error.error.review);
          }
        }
      });
  }
}

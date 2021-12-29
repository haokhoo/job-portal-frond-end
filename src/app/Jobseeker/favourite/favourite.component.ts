import { Component, OnInit } from '@angular/core';
import { AuthenticationService, FavouriteCompany, FavouriteJob } from 'src/app/authentication.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  fcompany: FavouriteCompany[]
  fjob: FavouriteJob[]

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getfcompany().subscribe(
      fcompany => {
        this.fcompany = fcompany
      }
    )

    this.auth.getfejob().subscribe(
      fjob => {
        this.fjob = fjob
      }
    )
  }

  removefCompany(id: String) {
    this.auth.deletefcompany(id).subscribe(
      () => {
        this.auth.showSuccess("Company remove Successful!");
        window.location.reload()
      },
      () => {
        this.auth.showError("Something Error!")
      });
  }

  removefejob(id: String) {
    this.auth.deletefejob(id).subscribe(
      () => {
        this.auth.showSuccess("Job remove Successful!");
        window.location.reload()
      },
      () => {
        this.auth.showError("Something Error!")
      });
  }

}

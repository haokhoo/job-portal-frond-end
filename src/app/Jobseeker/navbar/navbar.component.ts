import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Notification } from 'src/app/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  unread: Notification[]
  user_id: any
  length = 0

  ngOnInit(): void {
    this.auth.getProfile().subscribe(
      profile => {
        if (profile[0] == undefined) {
          this.length = 0
        } else {
          this.auth.getunread(profile[0].id).subscribe(
            notification => {
              this.unread = notification
              this.length = this.unread.length
            }
          )
        }
      }
    )
  }



  logout() {
    this.auth.logout().subscribe()
    this.auth.showSuccess("Logout Successfully")
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Notification } from 'src/app/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  unread: Notification[]
  read: Notification[]

  notice: Notification = {
    title: '',
    desc: '',
    shorttext: '',
    status: '',
    id: '',
    created_at: ''
  }

  title: string
  desc: string
  shorttext: string
  created_at: string
  name: string
  job: string

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getProfile().subscribe(
      profile => {
        this.auth.getunread(profile[0].id).subscribe(
          notification => {
            this.unread = notification
          }
        )

        this.auth.getread(profile[0].id).subscribe(
          notification => {
            this.read = notification
          }
        )
      }
    )
  }

  get(id: any) {
    this.auth.getOneNotice(id).subscribe(
      notice => {
        this.title = notice[0].title
        this.desc = notice[0].desc
        this.shorttext = notice[0].shorttext
        this.created_at = notice[0].created_at
        this.name = notice[0].company_name
        this.job = notice[0].job_title
      }
    )
  }

  close(){
    window.location.reload()
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { AuthenticationService, Logo, User } from 'src/app/authentication.service';

@Component({
  selector: 'app-elayout',
  templateUrl: './elayout.component.html',
  styleUrls: ['./elayout.component.scss']
})
export class ElayoutComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user: User = {
    name: "",
    email: "",
    role_default: "",
  }

  logo: Logo[]

  constructor(private observer: BreakpointObserver, public auth: AuthenticationService) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe(
      user => {
        this.user = user.user
      }
    )

    this.auth.getLogo().subscribe(
      logo => {
        this.logo = logo.logo
      }
    )
  }

  logout() {
    this.auth.logout().subscribe()
    this.auth.showSuccess("Logout Successfully")
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from './message.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthInterceptor } from './auth.interceptors';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { FileValueAccessor } from './file-control-value-accessor';
import { FileValidator } from './file-input.validator';

//angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

// Forms and Reactive Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// MDB Angular Free
import {
  ModalModule, TooltipModule, PopoverModule,
  ButtonsModule, IconsModule,
  NavbarModule, WavesModule,
} from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LayoutComponent } from './Jobseeker/layout/layout.component';
import { HeaderComponent } from './Jobseeker/header/header.component';
import { FooterComponent } from './Jobseeker/footer/footer.component';
import { NavbarComponent } from './Jobseeker/navbar/navbar.component';
import { HomeComponent } from './Jobseeker/home/home.component';
import { ProfileComponent } from './Jobseeker/profile/profile.component';
import { ProfileLayoutComponent } from './Jobseeker/profile-layout/profile-layout.component';
import { EducationComponent } from './Jobseeker/education/education.component';
import { EducationUpdateComponent } from './Jobseeker/education-update/education-update.component';
import { ExperienceComponent } from './Jobseeker/experience/experience.component';
import { ExperienceUpdateComponent } from './Jobseeker/experience-update/experience-update.component';
import { SkillComponent } from './Jobseeker/skill/skill.component';
import { SkillUpdateComponent } from './Jobseeker/skill-update/skill-update.component';
import { ResumeComponent } from './Jobseeker/resume/resume.component';
import { LoginComponent } from './Employer/login/login.component';
import { ElayoutComponent } from './Employer/elayout/elayout.component';
import { PostajobComponent } from './Employer/postajob/postajob.component';
import { CompanydetailsComponent } from './Employer/companydetails/companydetails.component';
import { CompanydetailsAddComponent } from './Employer/companydetails-add/companydetails-add.component';
import { AllcompanyComponent } from './Jobseeker/allcompany/allcompany.component';
import { AllcompanyDetailsComponent } from './Jobseeker/allcompany-details/allcompany-details.component';
import { JobdetailsComponent } from './Jobseeker/jobdetails/jobdetails.component';
import { JobstatusComponent } from './Jobseeker/jobstatus/jobstatus.component';
import { JobmanageComponent } from './Employer/jobmanage/jobmanage.component';
import { ApplicantsComponent } from './Employer/applicants/applicants.component';
import { ApplicantsStatusComponent } from './Employer/applicants-status/applicants-status.component';
import { ApplicantsDisplayComponent } from './Employer/applicants-display/applicants-display.component';
import { ApplicantsDisplayRejectComponent } from './Employer/applicants-display-reject/applicants-display-reject.component';
import { FavouriteComponent } from './Jobseeker/favourite/favourite.component';
import { ReviewComponent } from './Jobseeker/review/review.component';
import { QuestionComponent } from './Jobseeker/question/question.component';
import { QnAComponent } from './Employer/qn-a/qn-a.component';
import { QnADialogComponent } from './Employer/qn-a-dialog/qn-a-dialog.component';
import { QuestionJobComponent } from './Jobseeker/question-job/question-job.component';
import { QnaJobComponent } from './Employer/qna-job/qna-job.component';
import { QnaJobDialogComponent } from './Employer/qna-job-dialog/qna-job-dialog.component';
import { NotificationComponent } from './Jobseeker/notification/notification.component';
import { DashboardComponent } from './Employer/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: NavbarComponent, canActivate: [AuthGuardService] },
      { path: 'profile', component: ProfileLayoutComponent, canActivate: [AuthGuardService] },
      { path: 'education/:id', component: EducationUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'experience/:id', component: ExperienceUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'skill/:id', component: SkillUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'status', component: JobstatusComponent, canActivate: [AuthGuardService] },
      { path: 'favourite', component: FavouriteComponent, canActivate: [AuthGuardService] },
      { path: 'company', component: AllcompanyComponent },
      { path: 'company/:id', component: AllcompanyDetailsComponent },
      { path: 'job/:id', component: JobdetailsComponent },
      { path: 'notification', component: NotificationComponent, canActivate: [AuthGuardService] },
    ]
  },
  {
    path: 'employer',
    component: ElayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'panel/post', component: PostajobComponent, canActivate: [AuthGuardService] },
      { path: 'panel/details', component: CompanydetailsComponent, canActivate: [AuthGuardService] },
      { path: 'panel/details/actions', component: CompanydetailsAddComponent, canActivate: [AuthGuardService] },
      { path: 'panel/manage', component: JobmanageComponent, canActivate: [AuthGuardService] },
      { path: 'panel/manage/:id', component: ApplicantsComponent, canActivate: [AuthGuardService] },
      { path: 'panel/applicant', component: ApplicantsStatusComponent, canActivate: [AuthGuardService] },
      { path: 'panel/applicant-shortlisted/:id', component: ApplicantsDisplayComponent, canActivate: [AuthGuardService] },
      { path: 'panel/applicant-rejected/:id', component: ApplicantsDisplayRejectComponent, canActivate: [AuthGuardService] },
      { path: 'panel/qna', component: QnAComponent, canActivate: [AuthGuardService] },
      { path: 'panel/qna/:id', component: QnADialogComponent, canActivate: [AuthGuardService] },
      { path: 'panel/qna-job/:id', component: QnaJobDialogComponent, canActivate: [AuthGuardService] },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    ProfileLayoutComponent,
    EducationComponent,
    EducationUpdateComponent,
    ExperienceComponent,
    ExperienceUpdateComponent,
    SkillComponent,
    SkillUpdateComponent,
    ResumeComponent,
    FileValueAccessor,
    FileValidator,
    LoginComponent,
    ElayoutComponent,
    PostajobComponent,
    CompanydetailsComponent,
    CompanydetailsAddComponent,
    AllcompanyComponent,
    AllcompanyDetailsComponent,
    JobdetailsComponent,
    JobstatusComponent,
    JobmanageComponent,
    ApplicantsComponent,
    ApplicantsStatusComponent,
    ApplicantsDisplayComponent,
    ApplicantsDisplayRejectComponent,
    FavouriteComponent,
    ReviewComponent,
    QuestionComponent,
    QnAComponent,
    QnADialogComponent,
    QuestionJobComponent,
    QnaJobComponent,
    QnaJobDialogComponent,
    NotificationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', maxOpened: 3, newestOnTop: true }),
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    ButtonsModule,
    NavbarModule,
    WavesModule,
    IconsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthenticationService, AuthGuardService, MessageService, HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

export interface UserDetails {
    username: string
    password: string
    exp: number
    iat: number
}

interface TokenResponse {
    token: string
}

export interface TokenPayload {
    name: string
    email: string
    password: string
}

export interface User {
    name: string
    email: string
    role: string
}

export interface Profile {
    fullname: string
    phone: string
    email: string
    address1: string
    address2: string
    city: string
    state: string
    postal: string
    summary: string
}

export interface Education {
    school: string
    course: string
    result: string
    start_date: string
    end_date: string
    id: string
}

export interface Experience {
    job_title: string
    employer: string
    start_date: string
    end_date: string
    id: string
}

export interface Skill {
    name: string
    rating: string
    id: string
}

export interface Skill {
    name: string
    rating: string
    id: string
}

export interface Resume {
    resume: string
}

export interface Company {
    company_name: string
    website: string
    email: string
    phone: string
    address1: string
    address2: string
    city: string
    state: string
    postal: string
    overview: string
    logo: string
    id: any
}

export interface eJob {
    id: string
    company_id: string
    title: string
    desc: string
    budget: string
    category: string
    position_type: string
    status: string
    company_name: string
    state: string
    updated_at: string
}

export interface apJob {
    id: string
    company_id: string
}

export interface Applicant {
    job_epy_job: string
    company_id: string
    job_jsk_job: string
    jsk_id: string
    status: string
}

export interface FavouriteCompany {
    company_id: string
    logo: string
    company_name: string
    id: string
}

export interface FavouriteJob {
    job_epy_id: string
    job_jsk_id: string
    title: string
    desc: string
    budget: string
    category: string
    position_type: string
    company_name: string
    state: string
    updated_at: string
    id: string
}

export interface Review {
    company_id: string
    review: string
    status: string
    id: string
}

export interface Question {
    company_id: string
    question: string
    status: string
    id: string
}

export interface Answer {
    company_id: string
    answer: string
    jobseeker_id: string
    id: string
}

export interface Question_Jobs {
    company_id: string
    question: string
    jsk_id: string
    job_epy_id: string
    id: string
}

export interface Answer_Jobs {
    company_id: string
    answer: string
    jsk_id: string
    question_id: string
    id: string
}

@Injectable()
export class AuthenticationService {
    private token: string

    constructor(private http: HttpClient, private router: Router, public toastr: ToastrService) { }

    showSuccess(text: string) {
        this.toastr.success(text, 'Success', {
            progressBar: true, timeOut: 5000, tapToDismiss: true,
        });
    }


    showError(text: string) {
        this.toastr.error(text, 'Error', {
            progressBar: true, timeOut: 5000, tapToDismiss: true,
        });
    }

    private saveToken(token: string): void {
        localStorage.setItem('usertoken', token)
        this.token = token
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('usertoken')
        }
        return this.token
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken()
        let payload
        if (token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        } else {
            return null
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails()
        if (user) {
            return user.exp > Date.now() / 1000
        } else {
            return false
        }
    }

    public logout(): Observable<any> {
        window.localStorage.removeItem("usertoken")
        window.location.href = '/';
        return this.http.get(`/api/logout`, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getEJob(): Observable<any> {
        return this.http.get(`/api/jobs`, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getCompanies(): Observable<any> {
        return this.http.get(`/api/allcompanies`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneCompanies(id: String): Observable<any> {
        return this.http.get<Company>(`/api/allcompanies/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneEJobs(id: String): Observable<any> {
        return this.http.get<eJob>(`/api/getOneJob/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getCompanyJobs(id: String): Observable<any> {
        return this.http.get<eJob>(`/api/company-jobs/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}`, }
        })
    }

    //Jobseeker------------------------------------------------------------------------------------------
    public register(user: TokenPayload): Observable<any> {
        return this.http.post(`/api/register-jobseeker`, user, {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    public login(user: TokenPayload): Observable<any> {
        const base = this.http.post(
            `/api/login-jobseeker`,
            { email: user.email, password: user.password },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token)
                }
                return data
            })
        )
        return request
    }

    public getProfile(): Observable<any> {
        return this.http.get(`/api/profile`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addProfile(p: Profile): Observable<any> {
        return this.http.post(`/api/profile`, p, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public updateProfile(p: Profile): Observable<Profile> {
        return this.http
            .put<Profile>(`/api/profile`, p, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public getEducation(): Observable<any> {
        return this.http.get(`/api/education`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneEducation(id: String): Observable<Education> {
        return this.http.get<Education>(`/api/education/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addEducation(e: Education): Observable<any> {
        return this.http.post(`/api/education`, e, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public updateEducation(id: String, e: Education): Observable<Education> {
        return this.http
            .put<Education>(`/api/education/${id}`, e, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public deleteEducation(id: String): Observable<any> {
        return this.http
            .delete(`/api/education/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public getExperience(): Observable<any> {
        return this.http.get(`/api/experiences`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneExperience(id: String): Observable<Experience> {
        return this.http.get<Experience>(`/api/experiences/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addExperience(e: Experience): Observable<any> {
        return this.http.post(`/api/experiences`, e, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public updateExperience(id: String, e: Experience): Observable<Experience> {
        return this.http
            .put<Experience>(`/api/experiences/${id}`, e, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public deleteExperience(id: String): Observable<any> {
        return this.http
            .delete(`/api/experiences/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public getSkill(): Observable<any> {
        return this.http.get(`/api/skills`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneSkill(id: String): Observable<Skill> {
        return this.http.get<Skill>(`/api/skills/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addSkill(e: Skill): Observable<any> {
        return this.http.post(`/api/skills`, e, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public updateSkill(id: String, e: Skill): Observable<Skill> {
        return this.http
            .put<Skill>(`/api/skills/${id}`, e, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public deleteSkill(id: String): Observable<any> {
        return this.http
            .delete(`/api/skills/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public getResume(): Observable<any> {
        return this.http.get(`/api/resume`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public applyEJob(id: string, j: apJob): Observable<any> {
        return this.http.post(`/api/applicants-apply/${id}`, j, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getApplicantPending(): Observable<any> {
        return this.http.get(`/api/applicant-pending`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getApplicantApproval(): Observable<any> {
        return this.http.get(`/api/applicant-approve`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getfcompany(): Observable<any> {
        return this.http.get(`/api/favourite-company`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addfcompany(id: string, f: FavouriteCompany): Observable<any> {
        return this.http.post(`/api/favourite-company/${id}`, f, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public deletefcompany(id: String): Observable<any> {
        return this.http
            .delete(`/api/favourite-company/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public getfejob(): Observable<any> {
        return this.http.get(`/api/favourite-jobs`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addfejob(id: string, f: FavouriteJob): Observable<any> {
        return this.http.post(`/api/favourite-jobs/${id}`, f, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public deletefejob(id: String): Observable<any> {
        return this.http
            .delete(`/api/favourite-jobs/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }
    
    public getReview(id: String): Observable<any> {
        return this.http.get<Company>(`/api/review/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addReview(id: string, r: Review): Observable<any> {
        return this.http.post(`/api/review/${id}`, r, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getQuestion(id: String): Observable<any> {
        return this.http.get<Company>(`/api/question-company/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addQuestion(id: string, q: Question): Observable<any> {
        return this.http.post(`/api/question-company/${id}`, q, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneQuestion(id: String): Observable<Question> {
        return this.http.get<Question>(`/api/question-dialog/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneAnswer(cid: String, id: String): Observable<any> {
        return this.http.get(`/api/answer-company/${cid}/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addAnswer(id: string, a: Answer): Observable<any> {
        return this.http.post(`/api/answer-company/${id}`, a, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getQuestionJob(id: String): Observable<any> {
        return this.http.get<Question_Jobs>(`/api/question-jobs/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addQuestionJob(id: string, q: Question_Jobs): Observable<any> {
        return this.http.post(`/api/question-jobs/${id}`, q, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneQuestionJob(id: String): Observable<Question_Jobs> {
        return this.http.get<Question_Jobs>(`/api/question-dialogs/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getOneAnswerJob(id: String): Observable<any> {
        return this.http.get(`/api/answer-job/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addAnswerJob(id: string, a: Answer_Jobs): Observable<any> {
        return this.http.post(`/api/answer-jobs/${id}`, a, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    //Employer----------------------------------------------------------------------------------------------
    public eRegister(user: TokenPayload): Observable<any> {
        return this.http.post(`/api/register-employer`, user, {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    public eLogin(user: TokenPayload): Observable<any> {
        const base = this.http.post(
            `/api/login-employer`,
            { email: user.email, password: user.password },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token)
                }
                return data
            })
        )
        return request
    }

    public getUser(): Observable<any> {
        return this.http.get(`/api/get-user`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getCompany(): Observable<any> {
        return this.http.get(`/api/companies`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public addEJob(id: String, j: eJob): Observable<any> {
        return this.http.post(`/api/jobs/${id}`, j, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getPendingJob(): Observable<any> {
        return this.http.get(`/api/jobs-pending`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getApproveJob(): Observable<any> {
        return this.http.get(`/api/jobs-approve`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getRemoveJob(): Observable<any> {
        return this.http.get(`/api/jobs-remove`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public removeEJob(id: String, e: eJob): Observable<eJob> {
        return this.http
            .put<eJob>(`/api/jobs-remove/${id}`, e, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public recoverEJob(id: String, e: eJob): Observable<eJob> {
        return this.http
            .put<eJob>(`/api/jobs-recover/${id}`, e, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public getApplicants(id: String, cid: String): Observable<any> {
        return this.http.get(`/api/applicants-display/${id}/${cid}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getApplicantsApproved(id: String, cid: String): Observable<any> {
        return this.http.get(`/api/applicants-approve/${id}/${cid}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getApplicantsRejected(id: String, cid: String): Observable<any> {
        return this.http.get(`/api/applicants-reject/${id}/${cid}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public getApplicantResume(id: String): Observable<any> {
        return this.http.get(`/api/get-applicant-resume/${id}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }

    public approveApplicant(id: String, a: Applicant): Observable<Applicant> {
        return this.http
            .put<Applicant>(`/api/applicants-approve/${id}`, a, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }

    public rejectApplicant(id: String, a: Applicant): Observable<Applicant> {
        return this.http
            .put<Applicant>(`/api/applicants-reject/${id}`, a, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            })
    }
}
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService, Resume } from 'src/app/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileValidator } from 'src/app/file-input.validator';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  validateResume: FormGroup;
  r: Resume = {
    resume: ""
  }

  getR: Resume

  constructor(public auth: AuthenticationService, private http: HttpClient, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.resumeForm()
    this.auth.getResume().subscribe(
      resume => {
        this.getR = resume
      }
    )
  }

  resumeForm() {
    this.validateResume = new FormGroup({
      file: new FormControl('', [FileValidator.validate])
    });
  }

  get file() {
    return this.validateResume.get('file');
  }

  fileEvent(e) {
    this.r.resume = e.target.files[0];
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.validateResume.patchValue({
          file: reader.result
        });

        this._cdr.markForCheck();
      };
    }
  }

  onSubmit(f: any) {
    const myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('resume', this.r.resume);
    this.http.post('/api/resume', myFormData, {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      }
    }).subscribe(data => {
      this.auth.showSuccess("Resume upload Successful");
      window.location.reload()
    },
      error => {
        if (error.error.error) {
          if (error.error.error.resume) {
            this.auth.showError(error.error.error.resume);
          }
        }
      });
  }
}

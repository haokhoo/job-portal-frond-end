import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionJobComponent } from './question-job.component';

describe('QuestionJobComponent', () => {
  let component: QuestionJobComponent;
  let fixture: ComponentFixture<QuestionJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

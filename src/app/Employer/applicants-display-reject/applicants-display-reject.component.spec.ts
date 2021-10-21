import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsDisplayRejectComponent } from './applicants-display-reject.component';

describe('ApplicantsDisplayRejectComponent', () => {
  let component: ApplicantsDisplayRejectComponent;
  let fixture: ComponentFixture<ApplicantsDisplayRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantsDisplayRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantsDisplayRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

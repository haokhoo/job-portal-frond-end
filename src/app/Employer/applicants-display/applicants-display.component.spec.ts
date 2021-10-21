import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsDisplayComponent } from './applicants-display.component';

describe('ApplicantsDisplayComponent', () => {
  let component: ApplicantsDisplayComponent;
  let fixture: ComponentFixture<ApplicantsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

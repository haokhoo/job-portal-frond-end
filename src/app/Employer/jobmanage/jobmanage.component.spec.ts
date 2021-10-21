import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobmanageComponent } from './jobmanage.component';

describe('JobmanageComponent', () => {
  let component: JobmanageComponent;
  let fixture: ComponentFixture<JobmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

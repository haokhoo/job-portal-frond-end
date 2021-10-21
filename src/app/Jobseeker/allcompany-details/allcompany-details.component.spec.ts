import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcompanyDetailsComponent } from './allcompany-details.component';

describe('AllcompanyDetailsComponent', () => {
  let component: AllcompanyDetailsComponent;
  let fixture: ComponentFixture<AllcompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydetailsAddComponent } from './companydetails-add.component';

describe('CompanydetailsAddComponent', () => {
  let component: CompanydetailsAddComponent;
  let fixture: ComponentFixture<CompanydetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanydetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

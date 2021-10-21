import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnAComponent } from './qn-a.component';

describe('QnAComponent', () => {
  let component: QnAComponent;
  let fixture: ComponentFixture<QnAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

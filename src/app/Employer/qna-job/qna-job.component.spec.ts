import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaJobComponent } from './qna-job.component';

describe('QnaJobComponent', () => {
  let component: QnaJobComponent;
  let fixture: ComponentFixture<QnaJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnaJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

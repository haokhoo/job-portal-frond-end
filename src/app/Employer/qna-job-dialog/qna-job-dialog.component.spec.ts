import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaJobDialogComponent } from './qna-job-dialog.component';

describe('QnaJobDialogComponent', () => {
  let component: QnaJobDialogComponent;
  let fixture: ComponentFixture<QnaJobDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnaJobDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

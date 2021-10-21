import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnADialogComponent } from './qn-a-dialog.component';

describe('QnADialogComponent', () => {
  let component: QnADialogComponent;
  let fixture: ComponentFixture<QnADialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnADialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnADialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

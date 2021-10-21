import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElayoutComponent } from './elayout.component';

describe('ElayoutComponent', () => {
  let component: ElayoutComponent;
  let fixture: ComponentFixture<ElayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

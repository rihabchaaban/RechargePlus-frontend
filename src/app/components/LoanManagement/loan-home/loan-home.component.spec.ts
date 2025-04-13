import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanHomeComponent } from './loan-home.component';

describe('LoanHomeComponent', () => {
  let component: LoanHomeComponent;
  let fixture: ComponentFixture<LoanHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanHomeComponent]
    });
    fixture = TestBed.createComponent(LoanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoansComponent } from './admin-loans.component';

describe('AdminLoansComponent', () => {
  let component: AdminLoansComponent;
  let fixture: ComponentFixture<AdminLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLoansComponent]
    });
    fixture = TestBed.createComponent(AdminLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

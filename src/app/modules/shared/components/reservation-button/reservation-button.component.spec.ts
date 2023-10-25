import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationButtonComponent } from './reservation-button.component';

describe('ReservationButtonComponent', () => {
  let component: ReservationButtonComponent;
  let fixture: ComponentFixture<ReservationButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationButtonComponent]
    });
    fixture = TestBed.createComponent(ReservationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

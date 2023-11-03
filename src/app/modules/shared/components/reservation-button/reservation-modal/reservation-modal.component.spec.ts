import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationModalComponent } from './reservation-modal.component';

describe('ReservationModalComponent', () => {
  let component: ReservationModalComponent;
  let fixture: ComponentFixture<ReservationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationModalComponent]
    });
    fixture = TestBed.createComponent(ReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

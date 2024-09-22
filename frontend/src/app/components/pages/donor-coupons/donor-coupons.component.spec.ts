import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorCouponsComponent } from './donor-coupons.component';

describe('DonorCouponsComponent', () => {
  let component: DonorCouponsComponent;
  let fixture: ComponentFixture<DonorCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonorCouponsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonorCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

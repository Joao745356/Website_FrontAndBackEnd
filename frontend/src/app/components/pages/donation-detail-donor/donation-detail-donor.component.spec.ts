import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDetailDonorComponent } from './donation-detail-donor.component';

describe('DonationDetailDonorComponent', () => {
  let component: DonationDetailDonorComponent;
  let fixture: ComponentFixture<DonationDetailDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationDetailDonorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationDetailDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

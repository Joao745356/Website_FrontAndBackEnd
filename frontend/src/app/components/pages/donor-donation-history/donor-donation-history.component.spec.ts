import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDonationHistoryComponent } from './donor-donation-history.component';

describe('DonorDonationHistoryComponent', () => {
  let component: DonorDonationHistoryComponent;
  let fixture: ComponentFixture<DonorDonationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonorDonationHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonorDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

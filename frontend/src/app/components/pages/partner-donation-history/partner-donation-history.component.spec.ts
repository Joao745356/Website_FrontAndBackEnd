import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDonationHistoryComponent } from './partner-donation-history.component';

describe('PartnerDonationHistoryComponent', () => {
  let component: PartnerDonationHistoryComponent;
  let fixture: ComponentFixture<PartnerDonationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnerDonationHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

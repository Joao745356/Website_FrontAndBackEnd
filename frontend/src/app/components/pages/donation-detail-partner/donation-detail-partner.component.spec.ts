import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDetailPartnerComponent } from './donation-detail-partner.component';

describe('DonationDetailPartnerComponent', () => {
  let component: DonationDetailPartnerComponent;
  let fixture: ComponentFixture<DonationDetailPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationDetailPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationDetailPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

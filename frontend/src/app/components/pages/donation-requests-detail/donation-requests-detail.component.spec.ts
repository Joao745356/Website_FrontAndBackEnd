import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRequestsDetailComponent } from './donation-requests-detail.component';

describe('DonationRequestsDetailComponent', () => {
  let component: DonationRequestsDetailComponent;
  let fixture: ComponentFixture<DonationRequestsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationRequestsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationRequestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

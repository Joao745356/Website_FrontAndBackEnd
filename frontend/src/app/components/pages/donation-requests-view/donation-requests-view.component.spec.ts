import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRequestsViewComponent } from './donation-requests-view.component';

describe('DonationRequestsViewComponent', () => {
  let component: DonationRequestsViewComponent;
  let fixture: ComponentFixture<DonationRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationRequestsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

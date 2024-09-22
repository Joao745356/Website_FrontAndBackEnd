import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDonationRequestComponent } from './make-donation-request.component';

describe('MakeDonationRequestComponent', () => {
  let component: MakeDonationRequestComponent;
  let fixture: ComponentFixture<MakeDonationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeDonationRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeDonationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

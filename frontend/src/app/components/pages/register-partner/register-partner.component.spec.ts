import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartnerComponent } from './register-partner.component';

describe('RegisterPartnerComponent', () => {
  let component: RegisterPartnerComponent;
  let fixture: ComponentFixture<RegisterPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

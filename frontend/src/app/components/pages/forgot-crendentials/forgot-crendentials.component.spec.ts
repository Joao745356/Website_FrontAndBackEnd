import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotCrendentialsComponent } from './forgot-crendentials.component';

describe('ForgotCrendentialsComponent', () => {
  let component: ForgotCrendentialsComponent;
  let fixture: ComponentFixture<ForgotCrendentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotCrendentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotCrendentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

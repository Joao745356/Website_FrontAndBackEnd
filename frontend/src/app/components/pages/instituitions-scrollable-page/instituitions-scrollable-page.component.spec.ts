import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituitionsScrollablePageComponent } from './instituitions-scrollable-page.component';

describe('InstituitionsScrollablePageComponent', () => {
  let component: InstituitionsScrollablePageComponent;
  let fixture: ComponentFixture<InstituitionsScrollablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstituitionsScrollablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstituitionsScrollablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

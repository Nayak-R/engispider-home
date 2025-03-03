import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipComponent } from './internship.component';

describe('InternshipComponent', () => {
  let component: InternshipComponent;
  let fixture: ComponentFixture<InternshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipComponent]
    });
    fixture = TestBed.createComponent(InternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

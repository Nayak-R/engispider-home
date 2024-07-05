import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiologComponent } from './diolog.component';

describe('DiologComponent', () => {
  let component: DiologComponent;
  let fixture: ComponentFixture<DiologComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiologComponent]
    });
    fixture = TestBed.createComponent(DiologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

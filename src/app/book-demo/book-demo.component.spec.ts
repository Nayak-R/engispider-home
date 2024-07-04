import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDemoComponent } from './book-demo.component';

describe('BookDemoComponent', () => {
  let component: BookDemoComponent;
  let fixture: ComponentFixture<BookDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDemoComponent]
    });
    fixture = TestBed.createComponent(BookDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

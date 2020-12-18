import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpOrderComponent } from './pop-up-order.component';

describe('PopUpOrderComponent', () => {
  let component: PopUpOrderComponent;
  let fixture: ComponentFixture<PopUpOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

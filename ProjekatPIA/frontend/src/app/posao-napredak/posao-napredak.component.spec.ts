import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosaoNapredakComponent } from './posao-napredak.component';

describe('PosaoNapredakComponent', () => {
  let component: PosaoNapredakComponent;
  let fixture: ComponentFixture<PosaoNapredakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosaoNapredakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosaoNapredakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPonudeComponent } from './pregled-ponude.component';

describe('PregledPonudeComponent', () => {
  let component: PregledPonudeComponent;
  let fixture: ComponentFixture<PregledPonudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledPonudeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledPonudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

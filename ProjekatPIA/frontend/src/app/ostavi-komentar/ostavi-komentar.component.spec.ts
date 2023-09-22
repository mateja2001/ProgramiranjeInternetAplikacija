import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OstaviKomentarComponent } from './ostavi-komentar.component';

describe('OstaviKomentarComponent', () => {
  let component: OstaviKomentarComponent;
  let fixture: ComponentFixture<OstaviKomentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OstaviKomentarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OstaviKomentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

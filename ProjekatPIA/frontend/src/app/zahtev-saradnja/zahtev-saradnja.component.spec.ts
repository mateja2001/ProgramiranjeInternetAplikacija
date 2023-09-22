import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevSaradnjaComponent } from './zahtev-saradnja.component';

describe('ZahtevSaradnjaComponent', () => {
  let component: ZahtevSaradnjaComponent;
  let fixture: ComponentFixture<ZahtevSaradnjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevSaradnjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahtevSaradnjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

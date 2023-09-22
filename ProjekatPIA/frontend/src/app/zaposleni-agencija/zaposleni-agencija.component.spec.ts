import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniAgencijaComponent } from './zaposleni-agencija.component';

describe('ZaposleniAgencijaComponent', () => {
  let component: ZaposleniAgencijaComponent;
  let fixture: ComponentFixture<ZaposleniAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaposleniAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

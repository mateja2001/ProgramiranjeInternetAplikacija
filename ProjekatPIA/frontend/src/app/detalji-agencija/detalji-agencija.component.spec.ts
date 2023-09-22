import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiAgencijaComponent } from './detalji-agencija.component';

describe('DetaljiAgencijaComponent', () => {
  let component: DetaljiAgencijaComponent;
  let fixture: ComponentFixture<DetaljiAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

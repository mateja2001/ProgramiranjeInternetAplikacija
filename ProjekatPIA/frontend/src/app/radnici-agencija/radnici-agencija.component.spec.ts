import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadniciAgencijaComponent } from './radnici-agencija.component';

describe('RadniciAgencijaComponent', () => {
  let component: RadniciAgencijaComponent;
  let fixture: ComponentFixture<RadniciAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadniciAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadniciAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

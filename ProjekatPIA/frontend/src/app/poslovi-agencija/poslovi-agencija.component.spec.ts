import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosloviAgencijaComponent } from './poslovi-agencija.component';

describe('PosloviAgencijaComponent', () => {
  let component: PosloviAgencijaComponent;
  let fixture: ComponentFixture<PosloviAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosloviAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosloviAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrihvatiZahtevComponent } from './prihvati-zahtev.component';

describe('PrihvatiZahtevComponent', () => {
  let component: PrihvatiZahtevComponent;
  let fixture: ComponentFixture<PrihvatiZahtevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrihvatiZahtevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrihvatiZahtevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijeKlijentComponent } from './agencije-klijent.component';

describe('AgencijeKlijentComponent', () => {
  let component: AgencijeKlijentComponent;
  let fixture: ComponentFixture<AgencijeKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijeKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijeKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

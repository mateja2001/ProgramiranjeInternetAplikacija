import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajRadnikaComponent } from './azuriraj-radnika.component';

describe('AzurirajRadnikaComponent', () => {
  let component: AzurirajRadnikaComponent;
  let fixture: ComponentFixture<AzurirajRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajRadnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

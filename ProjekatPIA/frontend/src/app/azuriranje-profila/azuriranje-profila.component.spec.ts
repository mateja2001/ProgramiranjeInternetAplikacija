import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeProfilaComponent } from './azuriranje-profila.component';

describe('AzuriranjeProfilaComponent', () => {
  let component: AzuriranjeProfilaComponent;
  let fixture: ComponentFixture<AzuriranjeProfilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeProfilaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjeProfilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

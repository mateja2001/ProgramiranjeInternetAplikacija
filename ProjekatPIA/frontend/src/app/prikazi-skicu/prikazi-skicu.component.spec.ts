import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikaziSkicuComponent } from './prikazi-skicu.component';

describe('PrikaziSkicuComponent', () => {
  let component: PrikaziSkicuComponent;
  let fixture: ComponentFixture<PrikaziSkicuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikaziSkicuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikaziSkicuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

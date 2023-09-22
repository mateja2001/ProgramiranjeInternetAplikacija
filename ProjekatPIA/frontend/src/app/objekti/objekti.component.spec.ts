import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjektiComponent } from './objekti.component';

describe('ObjektiComponent', () => {
  let component: ObjektiComponent;
  let fixture: ComponentFixture<ObjektiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjektiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjektiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

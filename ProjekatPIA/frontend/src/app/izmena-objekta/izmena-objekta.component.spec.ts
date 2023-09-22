import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaObjektaComponent } from './izmena-objekta.component';

describe('IzmenaObjektaComponent', () => {
  let component: IzmenaObjektaComponent;
  let fixture: ComponentFixture<IzmenaObjektaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaObjektaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmenaObjektaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

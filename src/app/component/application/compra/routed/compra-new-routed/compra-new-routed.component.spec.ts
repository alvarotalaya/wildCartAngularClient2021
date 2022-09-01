import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraNewRoutedComponent } from './compra-new-routed.component';

describe('TipoproductoNewRoutedComponent', () => {
  let component: CompraNewRoutedComponent;
  let fixture: ComponentFixture<CompraNewRoutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraNewRoutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraNewRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

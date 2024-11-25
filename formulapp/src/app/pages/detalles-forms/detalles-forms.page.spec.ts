import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesFormsPage } from './detalles-forms.page';

describe('DetallesFormsPage', () => {
  let component: DetallesFormsPage;
  let fixture: ComponentFixture<DetallesFormsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

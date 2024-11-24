import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderFormularioPage } from './responder-formulario.page';

describe('ResponderFormularioPage', () => {
  let component: ResponderFormularioPage;
  let fixture: ComponentFixture<ResponderFormularioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderFormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

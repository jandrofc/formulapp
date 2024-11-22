import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearformsPage } from './crearforms.page';

describe('CrearformsPage', () => {
  let component: CrearformsPage;
  let fixture: ComponentFixture<CrearformsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearformsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

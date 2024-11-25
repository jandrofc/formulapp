import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompartirFormsPage } from './compartir-forms.page';

describe('CompartirFormsPage', () => {
  let component: CompartirFormsPage;
  let fixture: ComponentFixture<CompartirFormsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

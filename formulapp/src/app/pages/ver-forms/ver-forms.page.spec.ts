import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerFormsPage } from './ver-forms.page';

describe('VerFormsPage', () => {
  let component: VerFormsPage;
  let fixture: ComponentFixture<VerFormsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

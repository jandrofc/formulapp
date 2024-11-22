import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreparadorPage } from './preparador.page';

describe('PreparadorPage', () => {
  let component: PreparadorPage;
  let fixture: ComponentFixture<PreparadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

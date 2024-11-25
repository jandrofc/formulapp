import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisformsPage } from './misforms.page';

describe('MisformsPage', () => {
  let component: MisformsPage;
  let fixture: ComponentFixture<MisformsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisformsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

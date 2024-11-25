import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrenadoPage } from './entrenado.page';

describe('EntrenadoPage', () => {
  let component: EntrenadoPage;
  let fixture: ComponentFixture<EntrenadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

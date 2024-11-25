import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisRespPage } from './mis-resp.page';

describe('MisRespPage', () => {
  let component: MisRespPage;
  let fixture: ComponentFixture<MisRespPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRespPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

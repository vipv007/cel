import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FchartComponent } from './fchart.component';

describe('FchartComponent', () => {
  let component: FchartComponent;
  let fixture: ComponentFixture<FchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FchartComponent]
    });
    fixture = TestBed.createComponent(FchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

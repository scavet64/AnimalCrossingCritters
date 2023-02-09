import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CritterDisplayComponent } from './critter-display.component';

describe('CritterDisplayComponent', () => {
  let component: CritterDisplayComponent;
  let fixture: ComponentFixture<CritterDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CritterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CritterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

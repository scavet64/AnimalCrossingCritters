import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeepseaComponent } from './deepsea.component';

describe('DeepseaComponent', () => {
  let component: DeepseaComponent;
  let fixture: ComponentFixture<DeepseaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeepseaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepseaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

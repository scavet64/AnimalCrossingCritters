import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TitleNavComponent } from './title-nav.component';

describe('TitleNavComponent', () => {
  let component: TitleNavComponent;
  let fixture: ComponentFixture<TitleNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

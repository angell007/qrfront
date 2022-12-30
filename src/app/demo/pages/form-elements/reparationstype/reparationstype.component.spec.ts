import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReparationstypeComponent } from './reparationstype.component';

describe('ReparationstypeComponent', () => {
  let component: ReparationstypeComponent;
  let fixture: ComponentFixture<ReparationstypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationstypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

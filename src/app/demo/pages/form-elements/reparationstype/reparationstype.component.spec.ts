import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationstypeComponent } from './reparationstype.component';

describe('ReparationstypeComponent', () => {
  let component: ReparationstypeComponent;
  let fixture: ComponentFixture<ReparationstypeComponent>;

  beforeEach(async(() => {
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

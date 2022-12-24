import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexuserComponent } from './indexuser.component';

describe('IndexuserComponent', () => {
  let component: IndexuserComponent;
  let fixture: ComponentFixture<IndexuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyownersComponent } from './myowners.component';

describe('MyownersComponent', () => {
  let component: MyownersComponent;
  let fixture: ComponentFixture<MyownersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyownersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyownersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

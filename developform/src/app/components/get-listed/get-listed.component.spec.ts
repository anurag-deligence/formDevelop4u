import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetListedComponent } from './get-listed.component';

describe('GetListedComponent', () => {
  let component: GetListedComponent;
  let fixture: ComponentFixture<GetListedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetListedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

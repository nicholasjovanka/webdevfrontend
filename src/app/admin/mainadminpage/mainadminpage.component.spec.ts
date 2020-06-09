import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainadminpageComponent } from './mainadminpage.component';

describe('MainadminpageComponent', () => {
  let component: MainadminpageComponent;
  let fixture: ComponentFixture<MainadminpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainadminpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainadminpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

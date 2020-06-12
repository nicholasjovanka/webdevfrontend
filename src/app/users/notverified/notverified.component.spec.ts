import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotverifiedComponent } from './notverified.component';

describe('NotverifiedComponent', () => {
  let component: NotverifiedComponent;
  let fixture: ComponentFixture<NotverifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotverifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

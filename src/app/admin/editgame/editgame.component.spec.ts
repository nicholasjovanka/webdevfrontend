import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgameComponent } from './editgame.component';

describe('EditgameComponent', () => {
  let component: EditgameComponent;
  let fixture: ComponentFixture<EditgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

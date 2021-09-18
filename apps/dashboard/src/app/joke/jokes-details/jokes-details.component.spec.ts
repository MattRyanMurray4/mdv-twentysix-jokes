import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesDetailsComponent } from './jokes-details.component';

describe('JokesDetailsComponent', () => {
  let component: JokesDetailsComponent;
  let fixture: ComponentFixture<JokesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

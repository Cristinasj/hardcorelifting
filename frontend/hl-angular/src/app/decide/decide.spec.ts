import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decide } from './decide';

describe('Decide', () => {
  let component: Decide;
  let fixture: ComponentFixture<Decide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

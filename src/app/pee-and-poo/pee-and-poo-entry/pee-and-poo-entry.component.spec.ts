import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeeAndPooEntryComponent } from './pee-and-poo-entry.component';

describe('PeeAndPooEntryComponent', () => {
  let component: PeeAndPooEntryComponent;
  let fixture: ComponentFixture<PeeAndPooEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeeAndPooEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeeAndPooEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

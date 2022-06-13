import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeeAndPooListComponent } from './pee-and-poo-list.component';

describe('PeeAndPooListComponent', () => {
  let component: PeeAndPooListComponent;
  let fixture: ComponentFixture<PeeAndPooListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeeAndPooListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeeAndPooListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

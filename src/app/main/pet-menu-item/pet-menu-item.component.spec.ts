import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetMenuItemComponent } from './pet-menu-item.component';

describe('PetMenuItemComponent', () => {
  let component: PetMenuItemComponent;
  let fixture: ComponentFixture<PetMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDeleteModalComponent } from './save-delete-modal.component';

describe('SaveDeleteModalComponent', () => {
  let component: SaveDeleteModalComponent;
  let fixture: ComponentFixture<SaveDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveDeleteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

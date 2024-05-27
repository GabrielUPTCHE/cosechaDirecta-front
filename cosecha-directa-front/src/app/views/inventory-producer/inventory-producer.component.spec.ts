import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProducerComponent } from './inventory-producer.component';

describe('InventoryProducerComponent', () => {
  let component: InventoryProducerComponent;
  let fixture: ComponentFixture<InventoryProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryProducerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

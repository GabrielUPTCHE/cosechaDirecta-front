import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardProducerComponent } from './dasboard-producer.component';

describe('DasboardProducerComponent', () => {
  let component: DasboardProducerComponent;
  let fixture: ComponentFixture<DasboardProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardProducerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DasboardProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

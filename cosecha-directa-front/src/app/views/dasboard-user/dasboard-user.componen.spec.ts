import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardUserComponent } from './dasboard-user.component';

describe('DasboardUserComponent', () => {
  let component: DasboardUserComponent;
  let fixture: ComponentFixture<DasboardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DasboardUserComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

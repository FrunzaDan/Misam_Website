import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnInfoComponent } from './return-info.component';

describe('ReturnInfoComponent', () => {
  let component: ReturnInfoComponent;
  let fixture: ComponentFixture<ReturnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidBarComponent } from './said-bar.component';

describe('SaidBarComponent', () => {
  let component: SaidBarComponent;
  let fixture: ComponentFixture<SaidBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

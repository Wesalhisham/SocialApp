import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasComponent } from './change-pas.component';

describe('ChangePasComponent', () => {
  let component: ChangePasComponent;
  let fixture: ComponentFixture<ChangePasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

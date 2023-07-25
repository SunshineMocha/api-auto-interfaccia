import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutDealerDialogComponent } from './put-dealer-dialog.component';

describe('PutDealerDialogComponent', () => {
  let component: PutDealerDialogComponent;
  let fixture: ComponentFixture<PutDealerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PutDealerDialogComponent]
    });
    fixture = TestBed.createComponent(PutDealerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

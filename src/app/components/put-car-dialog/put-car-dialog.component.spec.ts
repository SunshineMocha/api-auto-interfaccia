import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutCarDialogComponent } from './put-car-dialog.component';

describe('PutCarDialogComponent', () => {
  let component: PutCarDialogComponent;
  let fixture: ComponentFixture<PutCarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PutCarDialogComponent]
    });
    fixture = TestBed.createComponent(PutCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

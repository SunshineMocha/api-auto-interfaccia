import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDealerComponent } from './post-dealer.component';

describe('PostDealerComponent', () => {
  let component: PostDealerComponent;
  let fixture: ComponentFixture<PostDealerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostDealerComponent]
    });
    fixture = TestBed.createComponent(PostDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

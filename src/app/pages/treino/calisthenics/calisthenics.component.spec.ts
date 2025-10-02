import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalisthenicsComponent } from './calisthenics.component';

describe('CalisthenicsComponent', () => {
  let component: CalisthenicsComponent;
  let fixture: ComponentFixture<CalisthenicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalisthenicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalisthenicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

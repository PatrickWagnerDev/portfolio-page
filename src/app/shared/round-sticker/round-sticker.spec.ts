import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoundSticker } from './round-sticker';

describe('RoundSticker', () => {
  let component: RoundSticker;
  let fixture: ComponentFixture<RoundSticker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundSticker],
    }).compileComponents();

    fixture = TestBed.createComponent(RoundSticker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

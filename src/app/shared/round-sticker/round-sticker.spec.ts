import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoundSticker } from './round-sticker';

describe('RoundSticker', () => {
  let fixture: ComponentFixture<RoundSticker>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RoundSticker] }).compileComponents();
    fixture = TestBed.createComponent(RoundSticker);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should be hidden from assistive technology', () => {
    expect(element.getAttribute('aria-hidden')).toBe('true');
  });

  it('should use the teal style by default', () => {
    expect(element.classList.contains('sticker-green')).toBe(false);
  });

  it('should switch to the green style', async () => {
    fixture.componentRef.setInput('color', 'green');
    await fixture.whenStable();
    expect(element.classList.contains('sticker-green')).toBe(true);
  });
});

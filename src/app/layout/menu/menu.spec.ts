import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { Menu } from './menu';

function dispatchTouch(target: Element, type: string, positionY: number): void {
  const EVENT = new Event(type, { bubbles: true });
  Object.defineProperty(EVENT, 'touches', { value: [{ clientY: positionY }] });
  target.dispatchEvent(EVENT);
}

describe('Menu', () => {
  let fixture: ComponentFixture<Menu>;
  let element: HTMLElement;
  let closeCount: number;

  function swipeUp(distance: number): void {
    const PANEL = element.querySelector('.menu-panel') as HTMLElement;
    dispatchTouch(PANEL, 'touchstart', 400);
    dispatchTouch(PANEL, 'touchmove', 400 - distance);
    PANEL.dispatchEvent(new Event('touchend', { bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    stubBrowserApis(true);
    await TestBed.configureTestingModule({ imports: [Menu], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Menu);
    fixture.componentRef.setInput('isOpen', true);
    closeCount = 0;
    fixture.componentInstance.closed.subscribe(() => closeCount++);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should render the four links and the three social links', () => {
    expect(element.querySelectorAll('.menu-link').length).toBe(4);
    expect(element.querySelectorAll('.menu-social').length).toBe(3);
  });

  it('should render the language switch', () => {
    expect(element.querySelector('app-language-switch .switch-input')).not.toBeNull();
  });

  it('should be marked as open and lock the page scroll', () => {
    expect(element.classList.contains('menu-open')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should be inert while closed', async () => {
    fixture.componentRef.setInput('isOpen', false);
    await fixture.whenStable();
    expect(element.querySelector('.menu-panel')?.hasAttribute('inert')).toBe(true);
    expect(document.body.style.overflow).toBe('');
  });

  it('should close with the close button', () => {
    (element.querySelector('.menu-close') as HTMLButtonElement).click();
    expect(closeCount).toBe(1);
  });

  it('should close when a link is clicked', () => {
    (element.querySelector('.menu-link') as HTMLAnchorElement).click();
    expect(closeCount).toBe(1);
  });

  it('should close with the escape key', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closeCount).toBe(1);
  });

  it('should close when clicking outside of the panel', () => {
    element.click();
    expect(closeCount).toBe(1);
  });

  it('should not close when clicking inside of the panel', () => {
    (element.querySelector('.menu-panel') as HTMLElement).click();
    expect(closeCount).toBe(0);
  });

  it('should not close after a short swipe up', () => {
    swipeUp(40);
    expect(closeCount).toBe(0);
  });

  it('should close after a long swipe up', () => {
    swipeUp(150);
    expect(closeCount).toBe(1);
  });

  it('should reset the panel position after the swipe', () => {
    swipeUp(40);
    expect((element.querySelector('.menu-panel') as HTMLElement).style.transform).toBe('');
  });
});

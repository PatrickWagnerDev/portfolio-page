import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { Header } from './header';

function setScrollPosition(position: number): void {
  Object.defineProperty(window, 'scrollY', { value: position, configurable: true });
  window.dispatchEvent(new Event('scroll'));
}

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let element: HTMLElement;

  async function scrollTo(position: number): Promise<void> {
    setScrollPosition(position);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    stubBrowserApis(true);
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    await TestBed.configureTestingModule({ imports: [Header], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => setScrollPosition(0));

  it('should render the four navigation links', () => {
    expect(element.querySelectorAll('.nav-link').length).toBe(4);
  });

  it('should render the language switch as a switch', () => {
    expect(element.querySelector('.switch-input')?.getAttribute('role')).toBe('switch');
  });

  it('should start with a closed menu', () => {
    const TOGGLE = element.querySelector('.menu-toggle') as HTMLButtonElement;
    expect(TOGGLE.getAttribute('aria-expanded')).toBe('false');
    expect(element.querySelector('app-menu')?.classList.contains('menu-open')).toBe(false);
  });

  it('should open the menu with the burger button', async () => {
    (element.querySelector('.menu-toggle') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(element.querySelector('.menu-toggle')?.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('app-menu')?.classList.contains('menu-open')).toBe(true);
  });

  it('should close the menu again with the close button', async () => {
    (element.querySelector('.menu-toggle') as HTMLButtonElement).click();
    await fixture.whenStable();
    (element.querySelector('.menu-close') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(element.querySelector('app-menu')?.classList.contains('menu-open')).toBe(false);
  });

  it('should show the plain header at the top of the page', () => {
    expect(element.classList.contains('header-solid')).toBe(false);
    expect(element.classList.contains('header-hidden')).toBe(false);
  });

  it('should hide the header and add the background when scrolling down', async () => {
    await scrollTo(200);
    expect(element.classList.contains('header-hidden')).toBe(true);
    expect(element.classList.contains('header-solid')).toBe(true);
  });

  it('should show the header again when scrolling up', async () => {
    await scrollTo(200);
    await scrollTo(100);
    expect(element.classList.contains('header-hidden')).toBe(false);
    expect(element.classList.contains('header-solid')).toBe(true);
  });

  it('should ignore tiny scroll movements', async () => {
    await scrollTo(200);
    await scrollTo(198);
    expect(element.classList.contains('header-hidden')).toBe(true);
  });

  it('should drop the background again at the top of the page', async () => {
    await scrollTo(200);
    await scrollTo(0);
    expect(element.classList.contains('header-solid')).toBe(false);
    expect(element.classList.contains('header-hidden')).toBe(false);
  });
});

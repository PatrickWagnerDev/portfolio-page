import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Header], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the four navigation links', () => {
    expect(element.querySelectorAll('.nav-link').length).toBe(4);
  });

  it('should render the language switch as an unchecked switch', () => {
    const input = element.querySelector('.switch-input') as HTMLInputElement;
    expect(input.getAttribute('role')).toBe('switch');
  });
});

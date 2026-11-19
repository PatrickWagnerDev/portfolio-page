import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Home], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should wrap the six sections in one main element', () => {
    expect(element.querySelectorAll('main').length).toBe(1);
    expect(element.querySelector('main')?.children.length).toBe(6);
  });

  it('should render the footer outside of the main element', () => {
    expect(element.querySelector('main app-footer')).toBeNull();
    expect(element.querySelector('app-footer')).not.toBeNull();
  });
});

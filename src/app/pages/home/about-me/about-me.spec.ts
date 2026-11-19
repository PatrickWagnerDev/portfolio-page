import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../../testing/test-setup';
import { AboutMe } from './about-me';

describe('AboutMe', () => {
  let fixture: ComponentFixture<AboutMe>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [AboutMe], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(AboutMe);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the three snippets', () => {
    expect(element.querySelectorAll('.snippet-item').length).toBe(3);
  });

  it('should link the button to the contact section', () => {
    expect(element.querySelector('.about-button')?.getAttribute('href')).toBe('#contact-section');
  });
});

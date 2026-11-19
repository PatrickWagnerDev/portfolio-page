import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Footer], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Footer);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the social links in the footer order', () => {
    const hrefs = Array.from(element.querySelectorAll('.footer-social')).map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://github.com/PatrickWagnerDev',
      'https://www.linkedin.com/in/patrickwagnerdev/',
      'mailto:kontakt@patrickwagnerdev.de',
    ]);
  });

  it('should open external links in a new tab', () => {
    const external = Array.from(element.querySelectorAll('.footer-social[target="_blank"]'));
    expect(external.length).toBe(2);
  });
});

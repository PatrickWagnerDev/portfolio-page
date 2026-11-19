import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../../testing/test-setup';
import { Hero } from './hero';

describe('Hero', () => {
  let fixture: ComponentFixture<Hero>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Hero], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render every letter of the title', () => {
    expect(element.querySelectorAll('.title-letter').length).toBe('Frontend'.length + 'Developer'.length);
  });

  it('should render the social links in the hero order', () => {
    const hrefs = Array.from(element.querySelectorAll('.social-link')).map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://www.linkedin.com/in/patrickwagnerdev/',
      'https://github.com/PatrickWagnerDev',
      'mailto:kontakt@patrickwagnerdev.de',
    ]);
  });
});

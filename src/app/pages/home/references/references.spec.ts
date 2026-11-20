import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../../testing/test-setup';
import { References } from './references';

describe('References', () => {
  let fixture: ComponentFixture<References>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [References], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(References);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the three references', () => {
    expect(element.querySelectorAll('.reference-item').length).toBe(3);
  });

  it('should render a profile link only for references with a url', () => {
    const references = (fixture.componentInstance as unknown as { references: { profileUrl: string }[] }).references;
    const expected = references.filter((reference) => reference.profileUrl).length;
    expect(element.querySelectorAll('.reference-link').length).toBe(expected);
  });

  it('should open the profile links in a new tab without giving access to the page', () => {
    element.querySelectorAll('.reference-link').forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener');
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CONTACT_INFO } from '../../data/contact-data';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { PrivacyPolicy } from './privacy-policy';

describe('PrivacyPolicy', () => {
  let fixture: ComponentFixture<PrivacyPolicy>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [PrivacyPolicy], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(PrivacyPolicy);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should show the contact data of the controller', () => {
    expect(element.textContent).toContain(CONTACT_INFO.email);
    expect(element.textContent).toContain(CONTACT_INFO.name);
  });

  it('should render the four numbered sections', () => {
    expect(element.querySelectorAll('.legal-section').length).toBe(4);
  });

  it('should show the translation notice when the language is not german', () => {
    expect(element.querySelector('.legal-section p')?.textContent).toContain('privacy.notice');
  });
});

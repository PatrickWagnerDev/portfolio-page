import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CONTACT_INFO } from '../../data/contact-data';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { LegalNotice } from './legal-notice';

describe('LegalNotice', () => {
  let fixture: ComponentFixture<LegalNotice>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [LegalNotice], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(LegalNotice);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should show the contact data', () => {
    expect(element.textContent).toContain(CONTACT_INFO.email);
    expect(element.textContent).toContain(CONTACT_INFO.phone);
    expect(element.textContent).toContain(CONTACT_INFO.street);
  });

  it('should link the source of the legal text', () => {
    expect(element.querySelector('a[href="https://www.e-recht24.de"]')).not.toBeNull();
  });
});

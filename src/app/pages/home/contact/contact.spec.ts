import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../../testing/test-setup';
import { Contact } from './contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Contact], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should disable the send button while the form is invalid', () => {
    const button = element.querySelector('.form-button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('should limit the length of the fields', () => {
    expect(element.querySelector('input[name=name]')?.getAttribute('maxlength')).toBe('100');
    expect(element.querySelector('input[name=email]')?.getAttribute('maxlength')).toBe('100');
    expect(element.querySelector('textarea[name=message]')?.getAttribute('maxlength')).toBe('5000');
  });

  it('should hide the honeypot field from assistive technology', () => {
    expect(element.querySelector('.honeypot-field')?.getAttribute('aria-hidden')).toBe('true');
  });
});

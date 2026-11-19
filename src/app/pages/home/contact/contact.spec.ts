import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../../testing/test-setup';
import { Contact } from './contact';

const MAIL_URL = '/contact-form-mail.php';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let element: HTMLElement;
  let http: HttpTestingController;

  function fillField(selector: string, value: string): void {
    const field = element.querySelector(selector) as HTMLInputElement;
    field.value = value;
    field.dispatchEvent(new Event('input'));
  }

  async function fillValidForm(): Promise<void> {
    fillField('input[name=name]', 'Test Person');
    fillField('input[name=email]', 'test@example.com');
    fillField('textarea[name=message]', 'Hello');
    (element.querySelector('input[name=privacy]') as HTMLInputElement).click();
    await fixture.whenStable();
  }

  function submitForm(): void {
    (element.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
  }

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Contact], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.match(MAIL_URL).forEach((request) => request.flush({})));

  it('should disable the send button while the form is invalid', () => {
    expect((element.querySelector('.form-button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('should enable the send button once the form is valid', async () => {
    await fillValidForm();
    expect((element.querySelector('.form-button') as HTMLButtonElement).disabled).toBe(false);
  });

  it('should limit the length of the fields', () => {
    expect(element.querySelector('input[name=name]')?.getAttribute('maxlength')).toBe('100');
    expect(element.querySelector('input[name=email]')?.getAttribute('maxlength')).toBe('100');
    expect(element.querySelector('textarea[name=message]')?.getAttribute('maxlength')).toBe('5000');
  });

  it('should hide the honeypot field from assistive technology', () => {
    expect(element.querySelector('.honeypot-field')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should not send an invalid form', () => {
    submitForm();
    http.expectNone(MAIL_URL);
  });

  it('should post the fields without the privacy flag', async () => {
    await fillValidForm();
    submitForm();
    const request = http.expectOne(MAIL_URL);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ name: 'Test Person', email: 'test@example.com', message: 'Hello', website: '' });
    request.flush({ success: true });
  });

  it('should pass the honeypot value on to the server', async () => {
    await fillValidForm();
    fillField('input[name=website]', 'spam');
    submitForm();
    const request = http.expectOne(MAIL_URL);
    expect(request.request.body.website).toBe('spam');
    request.flush({ success: true });
  });

  it('should show the success message and clear the form', async () => {
    await fillValidForm();
    submitForm();
    http.expectOne(MAIL_URL).flush({ success: true });
    await fixture.whenStable();
    expect(element.querySelector('.form-status')?.textContent).toContain('contact.sent');
    expect((element.querySelector('input[name=name]') as HTMLInputElement).value).toBe('');
  });

  it('should show the failure message and keep the data when sending fails', async () => {
    await fillValidForm();
    submitForm();
    http.expectOne(MAIL_URL).flush('error', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    expect(element.querySelector('.status-failed')?.textContent).toContain('contact.failed');
    expect((element.querySelector('input[name=name]') as HTMLInputElement).value).toBe('Test Person');
  });

  it('should not send twice while a request is running', async () => {
    await fillValidForm();
    submitForm();
    submitForm();
    expect(http.match(MAIL_URL).length).toBe(1);
  });
});

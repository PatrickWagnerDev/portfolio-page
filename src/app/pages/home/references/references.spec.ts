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

  it('should not render a profile link while the url is empty', () => {
    expect(element.querySelectorAll('.reference-link').length).toBe(0);
  });
});

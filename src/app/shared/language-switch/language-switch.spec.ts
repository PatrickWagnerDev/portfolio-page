import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { Language } from '../language/language';
import { LanguageSwitch } from './language-switch';

describe('LanguageSwitch', () => {
  let fixture: ComponentFixture<LanguageSwitch>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis(true);
    await TestBed.configureTestingModule({ imports: [LanguageSwitch], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(LanguageSwitch);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render a switch with both language labels', () => {
    expect(element.querySelector('.switch-input')?.getAttribute('role')).toBe('switch');
    expect(element.querySelectorAll('.language-label').length).toBe(2);
  });

  it('should toggle the language when the switch changes', async () => {
    const LANGUAGE = TestBed.inject(Language);
    const BEFORE = LANGUAGE.isGerman();
    (element.querySelector('.switch-input') as HTMLInputElement).click();
    await fixture.whenStable();
    expect(LANGUAGE.isGerman()).toBe(!BEFORE);
  });
});

import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Home } from './pages/home/home';
import { LegalNotice } from './pages/legal-notice/legal-notice';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { stubBrowserApis, TEST_PROVIDERS } from './testing/test-setup';

interface Page {
  name: string;
  component: Type<unknown>;
  inputs: Record<string, string>;
}

const PAGES: Page[] = [
  { name: 'Home', component: Home, inputs: {} },
  { name: 'LegalNotice', component: LegalNotice, inputs: {} },
  { name: 'PrivacyPolicy', component: PrivacyPolicy, inputs: {} },
  { name: 'ProjectDetail', component: ProjectDetail, inputs: { id: 'pokedex' } },
];

async function renderPage(page: Page): Promise<HTMLElement> {
  stubBrowserApis();
  await TestBed.configureTestingModule({ imports: [page.component], providers: TEST_PROVIDERS }).compileComponents();
  const fixture = TestBed.createComponent(page.component);
  Object.entries(page.inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

function hasLabel(control: Element, root: HTMLElement): boolean {
  const id = control.getAttribute('id');
  const hasLabelFor = id !== null && root.querySelector('label[for="' + id + '"]') !== null;
  return control.closest('label') !== null || hasLabelFor || control.hasAttribute('aria-label');
}

for (const page of PAGES) {
  describe('accessibility of ' + page.name, () => {
    let root: HTMLElement;

    beforeEach(async () => {
      root = await renderPage(page);
    });

    it('should give every image an alt attribute', () => {
      const withoutAlt = Array.from(root.querySelectorAll('img')).filter((image) => !image.hasAttribute('alt'));
      expect(withoutAlt.length).toBe(0);
    });

    it('should have exactly one main heading', () => {
      expect(root.querySelectorAll('h1').length).toBe(1);
    });

    it('should not skip a heading level', () => {
      const levels = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((heading) => Number(heading.tagName[1]));
      const jumps = levels.filter((level, index) => index > 0 && level - levels[index - 1] > 1);
      expect(jumps).toEqual([]);
    });

    it('should open every link with a new tab safely', () => {
      const unsafe = Array.from(root.querySelectorAll('a[target="_blank"]')).filter((link) => !(link.getAttribute('rel') ?? '').includes('noopener'));
      expect(unsafe.length).toBe(0);
    });

    it('should label every form control', () => {
      const controls = Array.from(root.querySelectorAll('input, textarea'));
      expect(controls.filter((control) => !hasLabel(control, root)).length).toBe(0);
    });
  });
}

import { TestBed } from '@angular/core/testing';
import { stubBrowserApis } from '../../testing/test-setup';
import { Intro } from './intro';

describe('Intro', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    vi.useFakeTimers();
  });

  afterEach(() => vi.useRealTimers());

  it('should run through all phases on the home page', () => {
    stubBrowserApis();
    const intro = TestBed.inject(Intro);
    expect(intro.phase()).toBe('letters');
    intro.startIntro(3);
    vi.runAllTimers();
    expect(intro.phase()).toBe('done');
  });

  it('should skip the intro for reduced motion', () => {
    stubBrowserApis(true);
    expect(TestBed.inject(Intro).phase()).toBe('done');
  });

  it('should skip the intro when the page is opened with an anchor', () => {
    stubBrowserApis();
    window.history.pushState({}, '', '/#contact-section');
    expect(TestBed.inject(Intro).phase()).toBe('done');
  });
});

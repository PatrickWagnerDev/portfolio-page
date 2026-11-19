import { TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from './testing/test-setup';
import { App } from './app';

describe('App', () => {
  it('should render the header and the router outlet', async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [App], providers: TEST_PROVIDERS }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-header')).not.toBeNull();
    expect(element.querySelector('router-outlet')).not.toBeNull();
  });
});

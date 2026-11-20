import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PROJECT_INFOS } from '../../../data/project-data';
import { stubBrowserApis, TEST_PROVIDERS } from '../../../testing/test-setup';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Projects], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render one item for each project', () => {
    expect(element.querySelectorAll('.project-item').length).toBe(PROJECT_INFOS.length);
  });

  it('should link every project to its detail page', () => {
    const hrefs = Array.from(element.querySelectorAll('.project-button')).map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(PROJECT_INFOS.map((project) => '/project/' + project.id));
  });

  it('should mark only the featured project', () => {
    expect(element.querySelectorAll('.project-featured').length).toBe(PROJECT_INFOS.filter((project) => project.featured).length);
  });

  it('should link every project title to its detail page', () => {
    const hrefs = Array.from(element.querySelectorAll('.title-link')).map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(PROJECT_INFOS.map((project) => '/project/' + project.id));
  });
});

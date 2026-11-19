import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stubBrowserApis, TEST_PROVIDERS } from '../../testing/test-setup';
import { ProjectDetail } from './project-detail';

describe('ProjectDetail', () => {
  let fixture: ComponentFixture<ProjectDetail>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [ProjectDetail], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(ProjectDetail);
    fixture.componentRef.setInput('id', 'join');
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the project title', () => {
    expect(element.querySelector('.project-name')?.textContent).toContain('Join');
  });

  it('should link to the previous and the next project', () => {
    expect(element.querySelector('.back-link')?.getAttribute('href')).toBe('/project/pokedex');
    expect(element.querySelector('.next-link')?.getAttribute('href')).toBe('/project/the-last-spellbound');
  });

  it('should show the coming soon banner for a project that is not finished', () => {
    expect(element.querySelector('.coming-soon-banner')).not.toBeNull();
  });

  it('should render one icon for each technology', () => {
    expect(element.querySelectorAll('.technology-item').length).toBe(5);
  });
});

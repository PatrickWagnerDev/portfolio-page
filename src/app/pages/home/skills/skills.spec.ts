import { ComponentFixture, TestBed } from '@angular/core/testing';
import { INTEREST_INFOS, SKILL_INFOS } from '../../../data/skill-data';
import { stubBrowserApis, TEST_PROVIDERS } from '../../../testing/test-setup';
import { Skills } from './skills';

describe('Skills', () => {
  let fixture: ComponentFixture<Skills>;
  let element: HTMLElement;

  beforeEach(async () => {
    stubBrowserApis();
    await TestBed.configureTestingModule({ imports: [Skills], providers: TEST_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Skills);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render every skill and interest', () => {
    expect(element.querySelectorAll('.skill-item').length).toBe(SKILL_INFOS.length);
    expect(element.querySelectorAll('.interested-item').length).toBe(INTEREST_INFOS.length);
  });

  it('should use the skill name as visible text', () => {
    const names = Array.from(element.querySelectorAll('.skill-item .skill-name')).map((item) => item.textContent);
    expect(names).toEqual(SKILL_INFOS.map((skill) => skill.name));
  });
});

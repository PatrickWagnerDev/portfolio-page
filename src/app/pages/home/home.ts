import { Component } from '@angular/core';
import { AboutMe } from './about-me/about-me';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';
import { Projects } from './projects/projects';
import { References } from './references/references';
import { Skills } from './skills/skills';

@Component({
  imports: [Hero, AboutMe, Skills, Projects, References, Contact],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
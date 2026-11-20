import { Component } from '@angular/core';
import { Footer } from '../../layout/footer/footer';
import { AboutMe } from './about-me/about-me';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';
import { Projects } from './projects/projects';
import { References } from './references/references';
import { Skills } from './skills/skills';

/** Home page that puts the sections and the footer together. */
@Component({
  imports: [Hero, AboutMe, Skills, Projects, References, Contact, Footer],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
# Portfolio Patrick Wagner

![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white)

This is my personal portfolio website. It introduces me, showcases my skills and presents my projects to visitors and potential employers. Built with Angular, it is fully responsive and available in German and English.

**Website:** [patrickwagnerdev.de](https://patrickwagnerdev.de)

## Features

- **Hero Section** – Short introduction with a professional photo (grey-white, turns to color with a caption on hover) and a call to action.
- **About Me** – Personal introduction and key facts about me.
- **Skill Set** – Overview of the technologies I work with.
- **Projects** – Preview of my projects with a dedicated detail page for each: The Last Spellbound, Join and Pokedex.
- **Colleagues' Thoughts** – Feedback and references from people I worked with.
- **Contact Form** – Form with validation on blur, a send button that is only active when the form is valid, including the privacy policy checkbox, and clear success or error feedback. Messages are sent via a PHP mailer.
- **Language Switch** – All texts can be switched between German and English. The language is detected from the browser and defaults to English.
- **Responsive Design** – Layouts for phone, tablet and desktop from 320 px up to widescreens, in portrait and landscape, with a burger menu (swipe up or tap outside to close) below 1024 px.
- **Legal Pages** – Legal Notice and Privacy Policy, reachable from the footer.

## Technologies

- Angular 22
- TypeScript
- SCSS
- ngx-translate
- PHP (mailer for the contact form)
- Vitest (unit tests, run with `npm test`)

## Credits

The design template and individual design elements are free to use and were provided by [Developer Akademie](https://developerakademie.com). Many thanks for providing them.

## Project Status

> **Current Status:** In Development

Responsive layout and German/English translation are done. Live hosting, real references and the Join project are still pending.

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org) v24.21.0
- npm (included with Node.js)

### Setup

Clone the repository:

```bash
git clone https://github.com/PatrickWagnerDev/portfolio-page.git
```

Install the dependencies and start the development server:

```bash
npm install
npm start
```

Open `http://localhost:4200` in your browser.

## About

This is a personal portfolio project and is not intended for production use by third parties. External contributions are not accepted.

## License

No license has been assigned to this project.

This project was created for educational and portfolio purposes and is not distributed under an open-source license.

## Author

**PatrickWagnerDev**
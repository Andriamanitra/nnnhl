# nnnhl

Website (https://andriamanitra.github.io/nnnhl/) for checking NHL schedule, scores, game recaps, and standings.
All of the code in this repository is released into public domain: you may copy, distribute and use any of it however you wish, without having to worry about attribution (more information available on [unlicense.org](https://unlicense.org/)).

The site is built using Svelte and TypeScript. It compiles into static website that uses the NHL statsapi ([unofficial documentation available on Gitlab](https://gitlab.com/dword4/nhlapi/-/tree/master)) to fetch data.



## Goals

The main goal of the project is to be more lightweight than the official site while still providing the most important bits of information. This means lower load times and less bandwidth used. To achieve this goal there will not be any ads, tracking, or images.

The following goals should be kept in mind when developing (roughly in order from most important to least important):
1. No spoilers (user needs to interact with the site to show scores/standings)
1. No ads or tracking
1. Accessibility: screen readers, keyboard navigation
1. Keep bundle size small
1. Use semantic HTML and classes to enable customization using userscripts, custom CSS, and content blockers
1. The site should be responsive and work reasonably on screen size varying from small phone screens up to 4k monitors.
1. Respect user's settings (local time zone, date format, favorite teams, dark/light mode)
1. Avoid relying on browser-specific behavior or workarounds



## Contributing

Contributions are accepted as long as they align with the project goals. Open an issue or make a pull request on Github to discuss changes!

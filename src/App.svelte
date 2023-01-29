<script lang="ts">
  import Schedule from "./lib/Schedule.svelte";
  import ThemeChanger from "./lib/ThemeChanger.svelte";
  import VideoPlayer from "./lib/VideoPlayer.svelte";
  import "@picocss/pico/css/pico.classless.min.css";
  import Standings from "./lib/Standings.svelte";
  import { setContext } from "svelte";
  let showStandings = false;
  const favoriteTeams = localStorage.getItem("favoriteTeams")?.split(",");
  setContext("favoriteTeams", new Set(favoriteTeams));
</script>

<header>
  <nav>
    <hgroup>
      <h1>NNNHL</h1>
      <h2>No Nonsense NHL scores & standings</h2>
    </hgroup>
    <ul>
      <li>
        <button on:click={() => (showStandings = !showStandings)}
          >{showStandings ? "Hide" : "Show"} standings</button
        >
      </li>
      <li><ThemeChanger /></li>
    </ul>
  </nav>
</header>
<main>
  <article class:hidden={!showStandings}>
    <Standings />
  </article>
  <article>
    <Schedule />
  </article>
</main>
<VideoPlayer />
<footer>
  <small>
    Built with <a href="https://svelte.dev/">Svelte</a> and
    <a href="https://picocss.com/">Pico</a>
    •
    <a href="https://github.com/andriamanitra/nnnhl">Source code</a>
  </small>
  <small>
    Other sites with spoiler-free NHL highlights:
    <a href="https://www.dtmts.com/nhl">DTMTS</a> •
    <a href="https://highlights.hockey/">highlights.hockey</a>
  </small>
</footer>

<style>
  header,
  main {
    padding-top: 1em;
    padding-bottom: 0em;
  }
  .hidden {
    display: none;
  }
  :global(article) {
    --block-spacing-vertical: 1em;
  }
  footer small {
    display: block;
  }
</style>

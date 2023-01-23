<script lang="ts">
  import Schedule from "./lib/Schedule.svelte";
  import ThemeChanger from "./lib/ThemeChanger.svelte";
  import VideoPlayer from "./lib/VideoPlayer.svelte";
  import "@picocss/pico/css/pico.classless.min.css";
  import Standings from "./lib/Standings.svelte";
  let showStandings = false;
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
  <Standings bind:shown={showStandings} />
  <Schedule />
</main>
<VideoPlayer />

<style>
  header,
  main {
    padding-top: 1em;
    padding-bottom: 0em;
  }
</style>

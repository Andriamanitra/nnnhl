<script lang="ts">
  import Schedule from "./lib/Schedule.svelte";
  import ThemeChanger from "./lib/ThemeChanger.svelte";
  import "@picocss/pico/css/pico.classless.min.css";
</script>

<header>
  <nav>
    <hgroup>
      <h1>NNNHL</h1>
      <h2>No Nonsense NHL scores & standings</h2>
    </hgroup>
    <ul>
      <li><button>Show standings</button></li>
      <li><ThemeChanger /></li>
    </ul>
  </nav>
</header>
<main>
  <Schedule />
</main>

<style>
  header,
  main {
    padding-top: 1em;
    padding-bottom: 0em;
  }
</style>

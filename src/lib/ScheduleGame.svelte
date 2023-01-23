<script lang="ts">
  import type { Game } from "../types/Schedule";
  import GameScore from "./GameScore.svelte";
  import Recaps from "./Recaps.svelte";
  import { showScores } from "../stores";
  import { getContext } from "svelte";

  export let game: Game;
  let showScore = false;
  const favoriteTeams: Set<string> = getContext("favoriteTeams");

  showScores.subscribe((show) => (showScore = show));

  const clockFmt = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
    hourCycle: "h23",
  });
</script>

<div class="game">
  <span>
    <span class="game-time" title={game.date.toUTCString()}>
      {clockFmt.format(game.date)}
    </span>
    <span class="teams">
      <span
        class="team"
        title={game.venue.name}
        class:favorite={favoriteTeams.has(game.teams.home.team.name)}
      >
        {game.teams.home.team.name}
      </span>
      -
      <span
        class="team"
        title="Visitor"
        class:favorite={favoriteTeams.has(game.teams.away.team.name)}
      >
        {game.teams.away.team.name}
      </span>
    </span>
  </span>
  <nav class="game-results">
    <ul>
      {#if game.status.detailedState === "Final"}
        <li><Recaps {game} /></li>
      {/if}
      {#if showScore}
        <li><GameScore {game} /></li>
      {/if}
    </ul>
  </nav>
</div>

<style>
  .favorite {
    color: var(--contrast);
    font-weight: 700;
    background-color: var(--primary-focus);
    padding: 0.15em 1.2ch;
    border-radius: 0.5em;
  }
  .game {
    display: flex;
    justify-content: space-between;
  }
  li {
    padding: 0 0.5em;
  }
</style>

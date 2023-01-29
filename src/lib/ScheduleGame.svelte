<script lang="ts">
  import type { Game } from "../types/Schedule";
  import GameScore from "./GameScore.svelte";
  import Recaps from "./Recaps.svelte";
  import { showScores } from "../stores";
  import TeamName from "./TeamName.svelte";

  export let game: Game;
  let showScore = false;

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
      <TeamName title="Home" team={game.teams.home.team} />
      -
      <TeamName title="Away" team={game.teams.away.team} />
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
  .game {
    display: flex;
    justify-content: space-between;
  }
  li {
    padding: 0 0.5em;
  }
</style>

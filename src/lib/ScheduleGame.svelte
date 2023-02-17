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

  function showRemainingTime(game: Game): string {
    let tRemaining = game.linescore.currentPeriodTimeRemaining;
    let periodName = `${game.linescore.currentPeriodOrdinal} period`;
    if (tRemaining == "END") {
      return `End of the ${periodName}`;
    }
    if (tRemaining == "20:00") {
      return `Beginning of the ${periodName}`;
    }
    return `${tRemaining} remaining in the ${periodName}`;
  }
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
      {:else if game.status.detailedState === "Pre-Game"}
        <span class="game-status pre-game"> PRE-GAME </span>
      {:else if game.status.abstractGameState === "Live"}
        <span title={showRemainingTime(game)} class="game-status live">
          LIVE
        </span>
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
  .pre-game {
    color: var(--muted-color);
  }
  .live {
    color: var(--del-color);
  }
  .game-status {
    padding: 0 1ch;
    margin-right: 10px;
    font-size: 0.7em;
    border-radius: 5px;
    outline: 1px solid var(--form-element-border-color);
  }
  li {
    padding: 0 0.5em;
  }
</style>

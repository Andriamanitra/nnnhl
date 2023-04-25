<script lang="ts">
  import BoxScoreDialog from "./BoxScoreDialog.svelte";
  import type { Game } from "../types/Schedule";
  import Recaps from "./Recaps.svelte";
  import { showScores } from "../stores";
  import TeamName from "./TeamName.svelte";

  export let game: Game;
  let showScore = false;
  let showBoxscorePopup = false;

  showScores.subscribe((show) => (showScore = show));

  const clockFmt = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
    hourCycle: "h23",
  });

  function hasStarted(game: Game) {
    return (
      game.status.abstractGameState === "Live" ||
      game.status.abstractGameState === "Final"
    );
  }

  function closeBoxScore() {
    showBoxscorePopup = false;
  }

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
  function playoffSeriesScore(game: Game): string {
    let homeWins = game.teams.home.leagueRecord.wins;
    let homeLosses = game.teams.home.leagueRecord.losses;
    if (homeWins > homeLosses) {
      return `${game.teams.home.team.abbreviation} leads series ${homeWins}-${homeLosses}`;
    } else if (homeWins < homeLosses) {
      return `${game.teams.away.team.abbreviation} leads series ${homeLosses}-${homeWins}`;
    } else {
      return `Series tied ${homeWins}-${homeLosses}`;
    }
  }
</script>

{#if showBoxscorePopup}
  <BoxScoreDialog {game} {closeBoxScore} />
{/if}

<div class="game">
  <span>
    {#if game.status.detailedState !== "Scheduled (Time TBD)"}
      <time
        class="game-time"
        title={game.date.toUTCString()}
        datetime={game.date.toISOString()}
      >
        {clockFmt.format(game.date)}
      </time>
    {/if}
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
        <li><span class="game-status pre-game"> PRE-GAME </span></li>
      {:else if game.status.abstractGameState === "Live"}
        <li>
          <span title={showRemainingTime(game)} class="game-status live">
            LIVE
          </span>
        </li>
      {/if}

      {#if showScore && hasStarted(game)}
        <li>
          <span
            class="gamescore"
            class:overtime={game.linescore.currentPeriod > 3}
            class:shootout={game.linescore.currentPeriodOrdinal === "SO"}
            on:dblclick={() => (showBoxscorePopup = true)}
          >
            {game.teams.home.score} - {game.teams.away.score}
          </span>
          {#if game.linescore.currentPeriodOrdinal === "SO"}
            <abbr title="Shootout" class="gamescore-extra-info">SO</abbr>
          {:else if game.linescore.currentPeriod > 3}
            <abbr title="Overtime" class="gamescore-extra-info">
              {game.linescore.currentPeriodOrdinal}
            </abbr>
          {/if}
        </li>
      {/if}

      {#if showScore && game.gameType === "P" && game.status.abstractGameState === "Preview"}
        <li class="series-score" title="Series score">
          {playoffSeriesScore(game)}
        </li>
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
  .teams {
    white-space: nowrap;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 0.5em;
  }
  .game-status {
    padding: 0 1ch;
    font-size: 0.7em;
    border-radius: 5px;
    outline: 1px solid var(--form-element-border-color);
  }
  .series-score {
    font-size: 0.6rem;
    color: var(--muted-color);
  }
  .gamescore {
    white-space: nowrap;
  }
  .gamescore-extra-info {
    position: relative;
    color: var(--muted-color);
    font-size: 0.7em;
    margin-right: -2.4ch;
    width: 2.4ch;
    left: 1ch;
    overflow-wrap: normal;
  }
</style>

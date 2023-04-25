<script lang="ts">
    import type { Game } from "../types/Schedule";
    import BoxScoreDialog from "./BoxScoreDialog.svelte";

    export let game: Game;
    let showBoxscorePopup = false;

    function hasStarted(game: Game) {
        return (
            game.status.abstractGameState === "Live" ||
            game.status.abstractGameState === "Final"
        );
    }
    function closeBoxScore() {
        showBoxscorePopup = false;
    }
</script>

{#if showBoxscorePopup}
    <BoxScoreDialog {game} {closeBoxScore} />
{/if}

{#if hasStarted(game)}
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
{/if}

<style>
    span {
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

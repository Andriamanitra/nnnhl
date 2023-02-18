<script lang="ts">
    import type { Game } from "../types/Schedule";
    export let game: Game;
</script>

{#if game.status.detailedState !== "Scheduled"}
    <span
        class="gamescore"
        class:overtime={game.linescore.currentPeriodOrdinal === "OT"}
        class:shootout={game.linescore.currentPeriodOrdinal === "SO"}
    >
        {game.teams.home.score} - {game.teams.away.score}
    </span>
    {#if game.linescore.currentPeriodOrdinal === "OT"}
        <abbr title="Overtime" class="gamescore-extra-info">OT</abbr>
    {:else if game.linescore.currentPeriodOrdinal === "SO"}
        <abbr title="Shootout" class="gamescore-extra-info">SO</abbr>
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

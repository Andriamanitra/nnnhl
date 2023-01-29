<script lang="ts">
    import type { Game } from "../types/Schedule";
    export let game: Game;
</script>

{#if game.status.detailedState === "Final"}
    <span>{game.teams.home.score} - {game.teams.away.score}</span>
{/if}

<style>
    span {
        white-space: nowrap;
    }
</style>

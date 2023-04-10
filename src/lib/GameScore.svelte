<script lang="ts">
    import type { BoxScore } from "../types/BoxScore";
    import type { Game } from "../types/Schedule";
    import PlayersBoxScoreTable from "./PlayersBoxScoreTable.svelte";
    import { clickOutside } from "./clickOutside";
    import { fetchBoxScore } from "./statsapiClient";

    export let game: Game;
    let boxscore: BoxScore | null = null;

    function showBoxScore(gamePk: number) {
        fetchBoxScore(gamePk).then((response) => (boxscore = response));
    }

    function hideBoxScore() {
        boxscore = null;
    }
</script>

{#if boxscore}
    <dialog id="scores-modal" open>
        <article
            class="boxscore"
            use:clickOutside
            on:outclick={hideBoxScore}
            on:keydown={(ev) => {
                if (ev.key == "Escape") hideBoxScore();
            }}
        >
            <h4>Team statistics</h4>
            <table role="grid">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Goals</th>
                        <th><abbr title="Penalty minutes">PIM</abbr></th>
                        <th>Shots</th>
                        <th>
                            <abbr title="Powerplay goals/attempts">PP</abbr>
                        </th>
                        <th><abbr title="Blocked shots">Blk</abbr></th>
                        <th>Hits</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.values(boxscore.teams) as team}
                        <tr>
                            <td>{team.team.name}</td>
                            <td>{team.teamStats.teamSkaterStats.goals}</td>
                            <td>{team.teamStats.teamSkaterStats.pim}</td>
                            <td>{team.teamStats.teamSkaterStats.shots}</td>
                            <td>
                                {team.teamStats.teamSkaterStats
                                    .powerPlayGoals}/{team.teamStats
                                    .teamSkaterStats.powerPlayOpportunities}
                            </td>
                            <td>{team.teamStats.teamSkaterStats.blocked}</td>
                            <td>{team.teamStats.teamSkaterStats.hits}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <h4>Player statistics</h4>
            {#each Object.values(boxscore.teams) as team}
                <details>
                    <summary>
                        {team.team.name}
                    </summary>
                    <PlayersBoxScoreTable {team} />
                </details>
            {/each}
        </article>
    </dialog>
{/if}

{#if game.status.detailedState !== "Scheduled"}
    <span
        class="gamescore"
        class:overtime={game.linescore.currentPeriodOrdinal === "OT"}
        class:shootout={game.linescore.currentPeriodOrdinal === "SO"}
        on:dblclick={() => {
            showBoxScore(game.gamePk);
        }}
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
    .boxscore {
        height: 85ch;
        scrollbar-width: none;
        padding: 1em 2em;
        --spacing: 1em;
        --font-size: 0.8em;
    }
    h4 {
        margin: 0;
        margin-bottom: 1em;
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
    summary:focus-visible {
        outline: 5px solid var(--primary-focus);
        border-radius: 5px;
        outline-offset: 4px;
    }
</style>

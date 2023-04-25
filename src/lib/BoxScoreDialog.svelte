<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { Game } from "../types/Schedule";
    import BoxScorePlayersTable from "./BoxScorePlayersTable.svelte";
    import { clickOutside } from "./clickOutside";
    import { fetchBoxScore } from "./statsapiClient";

    export let game: Game;

    export let closeBoxScore: () => void;

    function closeOnEsc(ev: KeyboardEvent) {
        if (ev.key == "Escape") closeBoxScore();
    }
    onMount(async () => {
        document.addEventListener("keydown", closeOnEsc);
    });
    onDestroy(() => {
        document.removeEventListener("keydown", closeOnEsc);
    });
</script>

{#await fetchBoxScore(game.gamePk) then boxscore}
    <dialog id="scores-modal" open>
        <article class="boxscore" use:clickOutside on:outclick={closeBoxScore}>
            <h4>Goals and shots by period</h4>
            <table role="grid">
                <thead>
                    <tr>
                        <th />
                        {#each game.linescore.periods as period}
                            <th>{period.ordinalNum}</th>
                        {/each}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="home-team">
                        <td rowspan="2">{game.teams.home.team.name}</td>
                        {#each game.linescore.periods as period}
                            <td>{period.home.goals || "-"}</td>
                        {/each}
                        <td class="total-score">{game.teams.home.score}</td>
                    </tr>
                    <tr class="home-team">
                        {#each game.linescore.periods as period}
                            <td>{period.home.shotsOnGoal}</td>
                        {/each}
                        <td />
                    </tr>
                    <tr class="away-team">
                        <td rowspan="2">{game.teams.away.team.name}</td>
                        {#each game.linescore.periods as period}
                            <td>{period.away.goals || "-"}</td>
                        {/each}
                        <td class="total-score">{game.teams.away.score}</td>
                    </tr>
                    <tr class="away-team">
                        {#each game.linescore.periods as period}
                            <td>{period.away.shotsOnGoal}</td>
                        {/each}
                        <td />
                    </tr>
                </tbody>
            </table>
            <h4>Team statistics</h4>
            <table role="grid">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Shots</th>
                        <th><abbr title="Faceoff percentage">FO%</abbr></th>
                        <th><abbr title="Penalty minutes">PIM</abbr></th>
                        <th>
                            <abbr title="Powerplay goals/attempts">PP</abbr>
                        </th>
                        <th><abbr title="Blocked shots">Blk</abbr></th>
                        <th>Hits</th>
                    </tr>
                </thead>
                <tbody>
                    {#each [boxscore.teams.home, boxscore.teams.away] as team}
                        <tr>
                            <td>{team.team.name}</td>
                            <td>{team.teamStats.teamSkaterStats.shots}</td>
                            <td
                                >{team.teamStats.teamSkaterStats
                                    .faceOffWinPercentage}</td
                            >
                            <td>{team.teamStats.teamSkaterStats.pim}</td>
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
            {#each [boxscore.teams.home, boxscore.teams.away] as team}
                <details>
                    <summary>
                        {team.team.name}
                    </summary>
                    <BoxScorePlayersTable {team} />
                </details>
            {/each}
        </article>
    </dialog>
{/await}

<style>
    .boxscore {
        width: 100%;
        height: 45em;
        scrollbar-width: none;
        padding: 1em 2em;
        --spacing: 1em;
        --font-size: 0.8em;
    }
    h4 {
        margin: 0;
        margin-bottom: 0.5em;
    }
    table {
        display: block;
        border-radius: var(--border-radius);
        border: 1px solid var(--muted-border-color);
        overflow-x: auto;
    }
    td:nth-of-type(n + 2) {
        text-align: center;
    }
    td,
    th {
        width: 100%;
    }
    tr:last-child > td {
        border-bottom: none;
    }
    details {
        overflow-x: auto;
    }
    summary:focus-visible {
        outline: 5px solid var(--primary-focus);
    }
    summary {
        border-radius: 5px;
        padding: 5px;
    }
    details[open] summary {
        padding-bottom: 0.25em;
        margin-bottom: 0.25em;
    }
    details {
        border: 1px solid var(--muted-border-color);
        border-radius: var(--border-radius);
        padding-bottom: 0px;
    }
    .total-score {
        font-weight: 800;
    }
    .home-team {
        background-color: var(--table-row-stripped-background-color);
    }
    .away-team {
        background-color: var(--card-background-color);
    }
</style>

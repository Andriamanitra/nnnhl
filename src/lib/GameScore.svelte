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
                    <PlayersBoxScoreTable {team} />
                </details>
            {/each}
        </article>
    </dialog>
{/if}

{#if game.status.detailedState !== "Scheduled"}
    <span
        class="gamescore"
        class:overtime={game.linescore.currentPeriod > 3}
        class:shootout={game.linescore.currentPeriodOrdinal === "SO"}
        on:dblclick={() => {
            showBoxScore(game.gamePk);
        }}
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
    .boxscore {
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

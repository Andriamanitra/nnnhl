<script lang="ts">
    import type { Player, TeamElement } from "../types/BoxScore";

    export let team: TeamElement;
    const skaters: Player[] = Object.values(team.players)
        .filter((p) => p.stats.skaterStats)
        .sort(compareTOI);
    const goalies: Player[] = Object.values(team.players).filter(
        (p) => p.stats.goalieStats
    );

    function compareTOI(a: Player, b: Player) {
        const aTOI = a.stats.skaterStats?.timeOnIce || "0:00";
        const bTOI = b.stats.skaterStats?.timeOnIce || "0:00";
        const aSeconds = parseInt(aTOI) * 60 + parseInt(aTOI.slice(-2));
        const bSeconds = parseInt(bTOI) * 60 + parseInt(bTOI.slice(-2));
        return bSeconds - aSeconds;
    }
</script>

<table role="grid">
    <thead>
        <tr>
            <th>Skaters</th>
            <th>Role</th>
            <th><abbr title="Time on ice">TOI</abbr></th>
            <th><abbr title="Goals">G</abbr></th>
            <th><abbr title="Assists">A</abbr></th>
            <th><abbr title="Shots">S</abbr></th>
            <th><abbr title="Blocked shots">Blk</abbr></th>
            <th>Hits</th>
            <th><abbr title="Penalty minutes">PIM</abbr></th>
        </tr>
    </thead>
    <tbody>
        {#each skaters as player}
            <tr>
                <td>
                    <span class="jersey-number">{player.jerseyNumber}</span>
                    <a href="https://nhl.com/player/{player.person.id}">
                        {player.person.fullName}
                    </a>
                </td>
                <td>{player.person.primaryPosition.abbreviation}</td>
                <td>{player.stats.skaterStats?.timeOnIce || "-"}</td>
                <td>{player.stats.skaterStats?.goals || "-"}</td>
                <td>{player.stats.skaterStats?.assists || "-"}</td>
                <td>{player.stats.skaterStats?.shots || "-"}</td>
                <td>{player.stats.skaterStats?.blocked || "-"}</td>
                <td>{player.stats.skaterStats?.hits || "-"}</td>
                <td>{player.stats.skaterStats?.penaltyMinutes || "-"}</td>
            </tr>
        {/each}
        <tr>
            <th>Goalies</th>
            <th />
            <th />
            <th />
            <th />
            <th><abbr title="Saves">Svs</abbr></th>
            <th><abbr title="Goals against">GA</abbr></th>
            <th><abbr title="Save percentage">SVS%</abbr></th>
            <th />
        </tr>
        {#each goalies as goalie}
            <tr>
                <td>
                    <span class="jersey-number">{goalie.jerseyNumber}</span>
                    <a href="https://nhl.com/player/{goalie.person.id}">
                        {goalie.person.fullName}
                    </a>
                </td>
                <td>{goalie.person.primaryPosition.abbreviation}</td>
                <td>{goalie.stats.goalieStats?.timeOnIce || "-"}</td>
                <td>{goalie.stats.goalieStats?.goals || "-"}</td>
                <td>{goalie.stats.goalieStats?.assists || "-"}</td>
                <td>{goalie.stats.goalieStats?.saves || "-"}</td>
                <td>
                    {(goalie.stats.goalieStats?.shots ?? 0) -
                        (goalie.stats.goalieStats?.saves ?? 0) || "-"}
                </td>
                <td>
                    {goalie.stats.goalieStats?.savePercentage?.toFixed(1) || "-"}
                </td>
                <td>{goalie.stats.goalieStats?.pim || "-"}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        --spacing: 4px;
        margin-bottom: 0;
    }
    th:nth-child(n + 2),
    td:nth-child(n + 2) {
        text-align: center;
    }
    tr:last-child > td {
        border-bottom: none;
    }
    a {
        background: transparent;
        padding: 0 0.5ch;
        margin-left: 0.5ch;
        white-space: nowrap;
    }
    a:focus-visible {
        outline: 5px solid var(--primary-focus);
    }
    .jersey-number {
        display: inline-block;
        text-align: center;
        width: 2ch;
    }
</style>

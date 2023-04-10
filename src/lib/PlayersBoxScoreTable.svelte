<script lang="ts">
    import type { Player, TeamElement } from "../types/BoxScore";

    export let team: TeamElement;
    let skaters: Player[];

    function compareTOI(a: Player, b: Player) {
        const aTOI = a.stats.skaterStats.timeOnIce;
        const bTOI = b.stats.skaterStats.timeOnIce;
        const aSeconds = parseInt(aTOI) * 60 + parseInt(aTOI.slice(-2));
        const bSeconds = parseInt(bTOI) * 60 + parseInt(bTOI.slice(-2));
        return bSeconds - aSeconds;
    }

    $: skaters = Object.values(team.players)
        .filter((p) => p.stats.skaterStats)
        .sort(compareTOI);
</script>

<table role="grid">
    <thead>
        <tr>
            <th>Player</th>
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
                    <a href="https://nhl.com/player/{player.person.id}">
                        {player.person.fullName}
                    </a>
                </td>
                <td>{player.person.primaryPosition.abbreviation}</td>
                <td>{player.stats.skaterStats.timeOnIce}</td>
                <td>{player.stats.skaterStats.goals || "-"}</td>
                <td>{player.stats.skaterStats.assists || "-"}</td>
                <td>{player.stats.skaterStats.shots || "-"}</td>
                <td>{player.stats.skaterStats.blocked || "-"}</td>
                <td>{player.stats.skaterStats.hits || "-"}</td>
                <td>{player.stats.skaterStats.penaltyMinutes || "-"}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        --spacing: 4px;
    }
    a {
        background: transparent;
        padding: 0 0.5ch;
        margin-left: 0.5ch;
    }
    a:focus-visible {
        outline: 5px solid var(--primary-focus);
    }
</style>

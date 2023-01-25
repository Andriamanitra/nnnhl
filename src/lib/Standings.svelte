<script lang="ts">
    import type { TeamRecord } from "../types/Standings";
    import { fetchStandings } from "./statsapiClient";

    function getCurrentSeason(date: Date): string {
        // if date is July or earlier show the season that started the
        // previous autumn (months in JS are zero-based)
        let startYear = date.getFullYear();
        if (date.getMonth() < 8) {
            startYear -= 1;
        }
        return `${startYear}${startYear + 1}`;
    }
    function last10(teamRecord: TeamRecord): string {
        const L10 = teamRecord.records.overallRecords.find(
            (overallRecord) => overallRecord.type === "lastTen"
        );
        return `${L10.wins}-${L10.losses}-${L10.ot}`;
    }
    function goodOrBad(val: Number, bad: Number = 0, good: Number = 0) {
        if (val < bad) return "bad";
        if (val > good) return "good";
        return "neutral";
    }
    const currentSeason = getCurrentSeason(new Date());
</script>

<h2>
    Standings for {currentSeason.slice(0, 4)}–{currentSeason.slice(4)}
</h2>
{#await fetchStandings(currentSeason)}
    <div aria-busy="true" />
{:then response}
    {#each response.records as divisionRecord}
        <h3>{divisionRecord.division.name}</h3>
        <figure>
            <table role="grid">
                <thead>
                    <tr>
                        <th />
                        <th />
                        <th title="Wins (regulation + overtime)">W</th>
                        <th title="Regulation losses">L</th>
                        <th title="Overtime losses">OT</th>
                        <th title="Games played">GP</th>
                        <th title="Points">Pts</th>
                        <th title="Points percentage">Pts%</th>
                        <th title="Goals scored">GF</th>
                        <th title="Goals against">GA</th>
                        <th title="Goal difference">+/-</th>
                        <th title="Record in last 10 games">L10</th>
                        <th title="Current winning/losing streak">Streak</th>
                    </tr>
                </thead>
                <tbody>
                    {#each divisionRecord.teamRecords as teamR}
                        <tr>
                            <td class={goodOrBad(-teamR.wildCardRank, -2, -3)}>
                                {teamR.divisionRank}.
                            </td>
                            <td>{teamR.team.name}</td>
                            <td>{teamR.leagueRecord.wins}</td>
                            <td>{teamR.leagueRecord.losses}</td>
                            <td>{teamR.leagueRecord.ot}</td>
                            <td>{teamR.gamesPlayed}</td>
                            <td>{teamR.points}</td>
                            <td
                                class={goodOrBad(
                                    teamR.pointsPercentage,
                                    0.5,
                                    0.57
                                )}
                            >
                                {teamR.pointsPercentage.toFixed(3)}
                            </td>
                            <td>{teamR.goalsScored}</td>
                            <td>{teamR.goalsAgainst}</td>
                            <td
                                class={goodOrBad(
                                    teamR.goalsScored - teamR.goalsAgainst
                                )}
                            >
                                {teamR.goalsScored - teamR.goalsAgainst}
                            </td>
                            <td>{last10(teamR)}</td>
                            <td>{teamR.streak.streakCode}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </figure>
    {/each}
{:catch error}
    <div>{error}</div>
{/await}

<style>
    h2 {
        margin-bottom: 1em;
    }
    h3 {
        margin-top: 1em;
        margin-bottom: -1.5em;
    }
    .good {
        color: rgb(95, 185, 95);
    }
    .bad {
        color: rgb(146, 84, 84);
    }
</style>

<script lang="ts">
    import { showScores } from "../stores";
    import ScheduleGame from "./ScheduleGame.svelte";
    import { fetchSchedule } from "./statsapiClient";
    const DAY = 24 * 3600 * 1000;
    const START_DATE_OFFSET = -3 * DAY;
    const DAYS_TO_SHOW = 7;
    const LANG = localStorage.getItem("LANG") || "en";

    let weekdayFmt = new Intl.DateTimeFormat(LANG, { weekday: "long" });
    let dateFmt = new Intl.DateTimeFormat(LANG, {
        day: "numeric",
        month: "numeric",
    });

    let startDate = new Date(Number(new Date()) + START_DATE_OFFSET);

    function capitalize(str: String): String {
        return str[0].toUpperCase() + str.slice(1);
    }

    const fetchDates = (async () => {
        let endDate = new Date(Number(startDate) + DAYS_TO_SHOW * DAY);
        const response = await fetchSchedule(startDate, endDate);
        return response["dates"];
    })();
</script>

<div class="settings">
    <input id="show-scores" type="checkbox" bind:checked={$showScores} />
    <label for="show-scores">Show scores</label>
</div>
{#await fetchDates then dates}
    {#each dates as day}
        <details open={true}>
            <summary title="Game date (in North American time)">
                <span class="game-date">
                    {capitalize(weekdayFmt.format(day.date))}
                    {dateFmt.format(day.date)}
                </span>
                <span class="num-games">({day.totalGames} games)</span>
            </summary>
            {#each day.games as game}
                <ScheduleGame {game} />
            {/each}
        </details>
    {/each}
{:catch error}
    <div>{error}</div>
{/await}

<style>
    summary:focus-visible {
        outline: 5px solid var(--primary-focus);
        border-radius: 5px;
        outline-offset: 4px;
    }
    .settings {
        height: 3em;
        width: fit-content;
        margin-left: auto;
        margin-right: 0px;
    }
    details {
        max-width: 60ch;
        margin: 0 auto;
    }
    summary span {
        vertical-align: middle;
    }
    .game-date {
        color: var(--primary);
    }
    .num-games {
        margin-left: 0.5em;
        font-size: small;
        color: var(--muted-color);
    }
</style>

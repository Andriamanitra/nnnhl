<script lang="ts">
    import { showScores } from "../stores";
    import type { GameDate } from "../types/Schedule";
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
        timeZone: "UTC",
    });

    let startDate: Date = new Date(Date.now() + START_DATE_OFFSET);
    let endDate: Date;

    function capitalize(str: String): String {
        return str[0].toUpperCase() + str.slice(1);
    }

    let fetchDates: Promise<GameDate[]>;
    function prevPage() {
        startDate = new Date(Number(startDate) - (1 + DAYS_TO_SHOW) * DAY);
    }
    function nextPage() {
        startDate = new Date(Number(startDate) + (1 + DAYS_TO_SHOW) * DAY);
    }
    $: endDate = new Date(Number(startDate) + DAYS_TO_SHOW * DAY);
    $: fetchDates = (async () => {
        const response = await fetchSchedule(startDate, endDate);
        return response["dates"];
    })();
</script>

<div class="settings">
    <div>
        <button class="page-change-button" on:click={prevPage}
            >&lt;&lt; Prev</button
        >
        <button class="page-change-button" on:click={nextPage}
            >Next &gt;&gt;</button
        >
    </div>
    <div>
        <input id="show-scores" type="checkbox" bind:checked={$showScores} />
        <label for="show-scores">Show scores</label>
    </div>
</div>
<h3 class="date-span-title centered">
    {dateFmt.format(startDate)} – {dateFmt.format(endDate)}
</h3>
{#await fetchDates}
    <div aria-busy="true" />
{:then dates}
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
    {:else}
        <p class="centered">No games</p>
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
        display: flex;
        justify-content: space-between;
    }
    .date-span-title {
        width: 100%;
        margin: 0 0 0.3em 0;
    }
    .centered {
        text-align: center;
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
    .page-change-button {
        display: inline-block;
        font-size: 1em;
        padding: 0px;
        width: 8ch;
        margin-right: 1ch;
    }
</style>

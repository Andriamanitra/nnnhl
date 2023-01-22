import type { Game, Schedule } from '../types/Schedule';

const API_URL = "https://statsapi.web.nhl.com/api/v1";

export async function fetchSchedule(startDate: Date, endDate: Date): Promise<Schedule> {
    const paramsObj = {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        expand: "schedule.game.content.media.epg"
    }
    const targetUrl = new URL(API_URL + "/schedule")
    targetUrl.search = new URLSearchParams(paramsObj).toString()

    const resp = await fetch(targetUrl);
    if (resp.ok) {
        const scheduleObj = await resp.json();
        scheduleObj.dates.forEach((day) => {
            day.date = new Date(Date.parse(day.date));
            for (let game of day.games) {
                game.date = new Date(Date.parse(game.gameDate));
            }
            // sort games by start time
            day.games = day.games.sort((a: Game, b: Game) => {
                return a.date >= b.date ? 1 : -1
            });
        });
        return scheduleObj;
    } else {
        throw new Error("Failed to get schedule from nhl.com api")
    }
}

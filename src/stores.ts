import { writable } from 'svelte/store';

// localStorage will remember theme
const storedTheme = localStorage.getItem("theme");
export const themeStore = writable(storedTheme || "dark");
themeStore.subscribe(newTheme => localStorage.setItem("theme", newTheme))

export const showScores = writable(false);

export const shownPlaybacksStore = writable(new Map(
    [
        ["FLASH_1800K_896x504", "mobile"],
        ["HTTP_CLOUD_WIRED_60", "desktop"],
    ]
));

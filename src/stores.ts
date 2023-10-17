import { writable } from 'svelte/store';

// Theme store backed by local storage
const storedTheme = localStorage.getItem("theme");
export const theme = writable(storedTheme || "dark");
theme.subscribe(newTheme => {
    document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
})

// Favorite teams store backed by local storage
const storedFavorites = localStorage.getItem("favoriteTeams")?.split(",");
const favStore = writable(new Set(storedFavorites || []));
export const favoriteTeams = {
    subscribe: favStore.subscribe,
    add: (team: string) => favStore.update(favs => favs.add(team)),
    remove: (team: string) => favStore.update(favs => { favs.delete(team); return favs }),
    reset: () => favStore.set(new Set())
}
favoriteTeams.subscribe(favs => {
    localStorage.setItem("favoriteTeams", [...favs].join(","))
})

// Date format language store backed by local storage
const storedLang = localStorage.getItem("LANG")
export const lang = writable(storedLang || "en")
lang.subscribe(newLang => {
    localStorage.setItem("LANG", newLang)
})

export const showScores = writable(false);

export const shownPlaybacksStore = writable(new Map(
    [
        ["FLASH_1800K_896x504", "mobile"],
        ["HTTP_CLOUD_WIRED_60", "desktop"],
    ]
));

export const videoSrcStore = writable("");

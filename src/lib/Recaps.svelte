<script lang="ts">
    import type { Game } from "../types/Schedule";
    import type { RecapLink } from "../types/RecapLink";
    import { shownPlaybacksStore } from "../stores";
    export let game: Game;
    // videoFormatNames is mapping from eg. "FLASH_1800K_896x504" to
    // something more human friendly, such as "mobile"
    // formats that don't exist in the mapping will not be shown to users!
    let videoFormatNames: Map<string, string> = new Map();
    shownPlaybacksStore.subscribe((v) => (videoFormatNames = v));
    let recapLinks: RecapLink[] = [];
    for (const epgItem of game.content.media.epg) {
        if (epgItem.title === "Extended Highlights") {
            epgItem.items[0].playbacks.forEach((playback) => {
                let videoFormat = videoFormatNames.get(playback.name);
                if (videoFormat) {
                    recapLinks.push({
                        content: "Extended Highlights",
                        videoFormat: videoFormat,
                        url: playback.url,
                    });
                }
            });
        } else if (epgItem.title === "Recap") {
            epgItem.items[0].playbacks.forEach((playback) => {
                let videoFormat = videoFormatNames.get(playback.name);
                if (videoFormat) {
                    recapLinks.push({
                        content: "Recap",
                        videoFormat: videoFormat,
                        url: playback.url,
                    });
                }
            });
        }
    }
</script>

<details class="recap-dropdown" role="list">
    <summary aria-haspopup="listbox"> Recaps </summary>
    <ul role="listbox">
        {#each recapLinks as recap}
            <li>
                <a href={recap.url}>{recap.content} ({recap.videoFormat})</a>
            </li>
        {/each}
    </ul>
</details>

<style>
    .recap-dropdown summary {
        padding-top: 0;
        height: 1.2em;
        line-height: 1.1em;
    }
</style>

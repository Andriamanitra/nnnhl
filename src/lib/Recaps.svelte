<script lang="ts">
    import type { Game } from "../types/Schedule";
    import type { RecapLink } from "../types/RecapLink";
    import { videoSrcStore } from "../stores";
    import { shownPlaybacksStore } from "../stores";
    export let game: Game;
    let dropdownOpened = false;
    // videoFormatNames is mapping from eg. "FLASH_1800K_896x504" to
    // something more human friendly, such as "mobile"
    // formats that don't exist in the mapping will not be shown to users!
    let videoFormatNames: Map<string, string> = new Map();
    shownPlaybacksStore.subscribe((v) => (videoFormatNames = v));
    let recapLinks: RecapLink[] = [];
    let mediaEpg = game?.content?.media?.epg;
    for (const epg of mediaEpg || []) {
        if (epg.title === "Extended Highlights") {
            let epgItem = epg.items[0];
            epgItem?.playbacks.forEach((playback) => {
                let videoFormat = videoFormatNames.get(playback.name);
                if (videoFormat) {
                    recapLinks.push({
                        content: "Extended Highlights",
                        videoFormat: videoFormat,
                        url: playback.url,
                        duration: epgItem.duration,
                    });
                }
            });
        } else if (epg.title === "Recap") {
            let epgItem = epg.items[0];
            epgItem?.playbacks.forEach((playback) => {
                let videoFormat = videoFormatNames.get(playback.name);
                if (videoFormat) {
                    recapLinks.push({
                        content: "Recap",
                        videoFormat: videoFormat,
                        url: playback.url,
                        duration: epgItem.duration,
                    });
                }
            });
        }
    }
</script>

{#if recapLinks.length > 0}
    <details class="recap-dropdown" role="list" bind:open={dropdownOpened}>
        <summary aria-haspopup="listbox"> Recap </summary>
        <ul role="listbox">
            {#each recapLinks as recap}
                <li>
                    <a
                        href={recap.url}
                        on:click={(ev) => {
                            if (recap.url.endsWith(".m3u8")) {
                                videoSrcStore.set(recap.url);
                                ev.preventDefault();
                                dropdownOpened = false;
                            }
                        }}
                    >
                        <span>{recap.content}</span>
                        <span class="recap-extra-info">
                            ({recap.duration}, {recap.videoFormat})
                        </span></a
                    >
                </li>
            {/each}
        </ul>
    </details>
{/if}

<style>
    .recap-dropdown summary {
        padding-top: 0;
        height: 1.2em;
        line-height: 1.1em;
        user-select: none;
    }
    .recap-dropdown summary::after {
        height: 1.2em;
    }
    .recap-extra-info {
        color: var(--muted-color);
        font-size: small;
    }
    a span {
        vertical-align: middle;
    }
    ul {
        left: initial; /* prevents dropdown from going off-screen */
    }
</style>

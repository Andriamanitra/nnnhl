<script lang="ts">
    import { favoriteTeams, lang, theme } from "../stores";
    import { clickOutside } from "./clickOutside";
    let dialog: HTMLDialogElement;
    let allTeams: string[] = "ANA,ARI,BOS,BUF,CAR,CBJ,CGY,CHI,COL,DAL,DET,EDM,FLA,LAK,MIN,MTL,NJD,NSH,NYI,NYR,OTT,PHI,PIT,SEA,SJS,STL,TBL,TOR,VAN,VGK,WPG,WSH".split(",");
    let dateLocales = {
        English: "en",
        Czech: "cs",
        Spanish: "es",
        Finnish: "fi",
        French: "fr",
        German: "de",
        Russian: "ru",
        Slovakian: "sk",
        Swedish: "sv",
    }
</script>

<button on:click={() => (dialog.open = true)}>Settings</button>
<dialog id="settings-dialog" bind:this={dialog}>
    <article use:clickOutside on:outclick={() => (dialog.open = false)}>
        <h4>Settings</h4>
        <fieldset>
            <legend><strong>Color theme</strong></legend>
            <label>
                <input type="radio" value="light" bind:group={$theme} />
                Light
            </label>
            <label>
                <input type="radio" value="dark" bind:group={$theme} />
                Dark
            </label>
        </fieldset>
        <fieldset>
            <legend><strong>Favorite teams</strong></legend>
            <div class="favorite-teams-grid">
                {#each allTeams as team}
                    <input
                        id="fav-{team}"
                        type="checkbox"
                        value={team}
                        checked={$favoriteTeams.has(team)}
                        on:change={(ev) => {
                            if (ev.currentTarget.checked) {
                                favoriteTeams.add(team);
                            } else {
                                favoriteTeams.remove(team);
                            }
                        }}
                    />
                    <label for="fav-{team}">
                        {team}
                    </label>
                {/each}
            </div>
        </fieldset>
        <fieldset>
            <legend><strong>Date format</strong></legend>
            <select bind:value={$lang}>
                {#each Object.entries(dateLocales) as [label, localeCode]}
                    <option value={localeCode}>{label}</option>
                {/each}
            </select>
        </fieldset>
        <form method="dialog">
            <button>Close settings</button>
        </form>
    </article>
</dialog>

<style>
    article {
        display: flex;
        flex-direction: column;
        gap: var(--form-element-spacing-vertical, 1em);
        padding: 1.5em;
        padding-bottom: 0;
    }
    fieldset {
        padding: 0.5em 1em 0.8em 1em;
        border-radius: var(--border-radius);
        border: var(--outline-width) solid var(--accordion-border-color);
    }
    .favorite-teams-grid {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 3fr 1fr 3fr 1fr 3fr 1fr 2fr;
    }
</style>

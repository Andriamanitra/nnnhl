<script lang="ts">
    import { getContext } from "svelte";
    import type { Team } from "../types/Schedule";

    export let team: Team;
    export let title = "";
    const favoriteTeams: Set<string> = getContext("favoriteTeams");
</script>

<span
    class="team"
    {title}
    data-abbr={team.abbreviation}
    data-shortname={team.shortName}
    data-teamname={team.teamName}
    data-longname={team.name}
    class:favorite={favoriteTeams.has(team.abbreviation)}
/>

<style>
    .team::after {
        content: attr(data-longname);
    }

    @media screen and (max-width: 85ch) {
        .team[data-teamname]::after {
            content: attr(data-teamname);
        }
    }

    @media screen and (max-width: 48ch) {
        .team[data-abbr]::after {
            content: attr(data-abbr);
        }
    }

    .favorite {
        color: var(--contrast);
        font-weight: 700;
        background-color: var(--primary-focus);
        padding: 0.1em 1ch;
        border-radius: 0.5em;
    }
</style>

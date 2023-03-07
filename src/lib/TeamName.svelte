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
    class:favorite={favoriteTeams.has(team.abbreviation)}
>
    <span class="team-name-abbr">{team.abbreviation}</span>
    <span class="team-name-short">{team.teamName}</span>
    <span class="team-name-long">{team.name}</span>
</span>

<style>
    .team {
        display: inline-block;
        line-height: 1.4em;
    }
    .team-name-short,
    .team-name-abbr {
        display: none;
    }
    @media screen and (max-width: 85ch) {
        .team-name-short {
            display: inline-block;
        }
        .team-name-abbr,
        .team-name-long {
            display: none;
        }
    }

    @media screen and (max-width: 48ch) {
        .team-name-abbr {
            display: inline-block;
        }
        .team-name-short,
        .team-name-long {
            display: none;
        }
    }

    .favorite {
        color: var(--contrast);
        font-weight: 700;
        background-color: var(--primary-focus);
        padding: 0.05em 0.8ch;
        border-radius: 0.5em;
    }
</style>

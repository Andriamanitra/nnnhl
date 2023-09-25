export type League = {
    id: number;
    name: string;
    link: string;
}

export type Division = {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
}

export type Conference = {
    id: number;
    name: string;
    link: string;
}

export type Team = {
    id: number;
    name: string;
    link: string;
}

export type LeagueRecord = {
    wins: number;
    losses: number;
    ot: number;
    type: string;
}

export type Streak = {
    streakType: string;
    streakNumber: number;
    streakCode: string;
}

export type OverallRecord = {
    wins: number;
    losses: number;
    ot: number;
    type: string;
}

export type Records = {
    overallRecords: OverallRecord[];
}

export type TeamRecord = {
    team: Team;
    leagueRecord: LeagueRecord;
    regulationWins: number;
    goalsAgainst: number;
    goalsScored: number;
    points: number;
    divisionRank: string;
    divisionL10Rank: string;
    divisionRoadRank: string;
    divisionHomeRank: string;
    conferenceRank: string;
    conferenceL10Rank: string;
    conferenceRoadRank: string;
    conferenceHomeRank: string;
    leagueRank: string;
    leagueL10Rank: string;
    leagueRoadRank: string;
    leagueHomeRank: string;
    wildCardRank: string;
    row: number;
    gamesPlayed: number;
    streak?: Streak;
    pointsPercentage: number;
    ppDivisionRank: string;
    ppConferenceRank: string;
    ppLeagueRank: string;
    records: Records;
    lastUpdated: Date;
}

export type DivisionStandings = {
    standingsType: string;
    league: League;
    division: Division;
    conference: Conference;
    season: string;
    teamRecords: TeamRecord[];
}

export type Standings = {
    copyright: string;
    records: DivisionStandings[];
}

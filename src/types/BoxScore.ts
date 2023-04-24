export type BoxScore = {
    copyright: string;
    teams: Teams;
    officials: OfficialElement[];
}

export type OfficialElement = {
    official: Official;
    officialType: string;
}

export type Official = {
    id: number;
    fullName: string;
    link: string;
}

export type Teams = {
    away: TeamElement;
    home: TeamElement;
}

export type TeamElement = {
    team: Team;
    teamStats: TeamStats;
    players: Record<string, Player>;
    goalies: number[];
    skaters: number[];
    onIce: number[];
    onIcePlus: OnIcePlus[];
    scratches: number[];
    penaltyBox: any[];
    coaches: Coach[];
}

export type Coach = {
    person: CoachPerson;
    position: Position;
}

export type CoachPerson = {
    fullName: string;
    link: string;
}

export type Position = {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export type OnIcePlus = {
    playerId: number;
    shiftDuration: number;
    stamina: number;
}

export type Player = {
    person: Person;
    jerseyNumber: string;
    position: Position;
    stats: PlayerStats;
}

export type Person = {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: Date;
    currentAge: number;
    birthCity: string;
    birthStateProvince?: string;
    birthCountry: string;
    nationality: string;
    height: string;
    weight: number;
    active: boolean;
    alternateCaptain: boolean;
    captain: boolean;
    rookie: boolean;
    shootsCatches: string;
    rosterStatus: string;
    currentTeam: Team;
    primaryPosition: Position;
}

export type Team = {
    id: number;
    name: string;
    link: string;
}

export type PlayerStats = {
    skaterStats?: SkaterStats;
    goalieStats?: GoalieStats;
}

export type SkaterStats = {
    timeOnIce: string;
    assists: number;
    goals: number;
    shots: number;
    hits: number;
    powerPlayGoals: number;
    powerPlayAssists: number;
    penaltyMinutes: number;
    faceOffWins: number;
    faceoffTaken: number;
    takeaways: number;
    giveaways: number;
    shortHandedGoals: number;
    shortHandedAssists: number;
    blocked: number;
    plusMinus: number;
    evenTimeOnIce: string;
    powerPlayTimeOnIce: string;
    shortHandedTimeOnIce: string;
    faceOffPct?: number;
}

export type GoalieStats = {
    timeOnIce: string;
    assists: number;
    goals: number;
    pim: number;
    shots: number;
    saves: number;
    powerPlaySaves: number;
    shortHandedSaves: number;
    evenSaves: number;
    shortHandedShotsAgainst: number;
    evenShotsAgainst: number;
    powerPlayShotsAgainst: number;
    decision?: string;
    savePercentage?: number;
    powerPlaySavePercentage?: number;
    evenStrengthSavePercentage?: number;
}

export type TeamStats = {
    teamSkaterStats: TeamSkaterStats;
}

export type TeamSkaterStats = {
    goals: number;
    pim: number;
    shots: number;
    powerPlayPercentage: string;
    powerPlayGoals: number;
    powerPlayOpportunities: number;
    faceOffWinPercentage: string;
    blocked: number;
    takeaways: number;
    giveaways: number;
    hits: number;
}

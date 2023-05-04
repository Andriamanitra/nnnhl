import type { Conference, Division } from "./Standings";

export type MetaData = {
    timeStamp: string;
}

export type Status = {
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    statusCode: string;
    startTimeTBD: boolean;
}

export type LeagueRecord = {
    wins: number;
    losses: number;
    ot: number;
    type: string;
}

export type Team = {
    id: number;
    franchiseId: number;
    active: boolean;
    firstYearOfPlay: string;
    abbreviation: string;
    name: string;
    shortName: string;
    teamName: string;
    locationName: string;
    venue: Venue;
    division: Division;
    conference: Conference;
    franchise: object;
    officialSiteUrl: string;
    link: string;
}

export type Away = {
    leagueRecord: LeagueRecord;
    score: number;
    team: Team;
}

export type Home = {
    leagueRecord: LeagueRecord;
    score: number;
    team: Team;
}

export type Teams = {
    away: Away;
    home: Home;
}

export type Venue = {
    id?: number;
    name: string;
    link: string;
}

export type Game = {
    gamePk: number;
    link: string;
    gameType: string;
    season: string;
    gameDate: string;
    date: Date;
    status: Status;
    teams: Teams;
    linescore: Linescore;
    venue: Venue;
    content: Content;
    seriesSummary?: SeriesSummary;
}

export type GameDate = {
    date: Date;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalMatches: number;
    games: Game[];
    events: any[];
    matches: any[];
}

export type Schedule = {
    copyright: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalMatches: number;
    metaData: MetaData;
    wait: number;
    dates: GameDate[];
}

export type Keyword = {
    type: string;
    value: string;
    displayName: string;
}

export type Image = {
    title: string;
    altText: string;
    cuts: object;
}

export type Playback = {
    name: string;
    width: string;
    height: string;
    url: string;
}

export type Item = {
    guid: string;
    mediaState: string;
    mediaPlaybackId: string;
    mediaFeedType: string;
    callLetters: string;
    eventId: string;
    language: string;
    freeGame: boolean;
    feedName: string;
    gamePlus: boolean;
    externalId: any[];
    type: string;
    id: string;
    date?: Date;
    title: string;
    blurb: string;
    description: string;
    duration: string;
    authFlow?: boolean;
    keywords: Keyword[];
    image: Image;
    playbacks: Playback[];
}

export type Epg = {
    title: string;
    platform: string;
    items: Item[];
    topicList: string;
}

export type Media = {
    epg: Epg[];
}

export type Content = {
    link: string;
    editorial?: object;
    media?: Media;
    highlights?: object;
}

export type LinescoreTeams = {
    away: LinescoreTeamScore;
    home: LinescoreTeamScore;
}

export type LinescoreTeamScore = {
    team: object;
    goals: number;
    shotsOnGoal: number;
    goaliePulled: boolean;
    numSkaters: number;
    powerPlay: boolean;
}

export type PeriodTeamScore = {
    goals: number;
    shotsOnGoal: number;
    rinkSide: string;
}

export type Period = {
    periodType: string;
    startTime: Date;
    endTime: Date;
    num: number;
    ordinalNum: string;
    home: PeriodTeamScore;
    away: PeriodTeamScore;
}

export type ShootoutAttempts = {
    scores: number;
    attempts: number;
}

export type ShootoutInfo = {
    away: ShootoutAttempts;
    home: ShootoutAttempts;
    startTime?: Date;
}

export type IntermissionInfo = {
    intermissionTimeRemaining: number;
    intermissionTimeElapsed: number;
    inIntermission: boolean;
}

export type PowerPlayInfo = {
    situationTimeRemaining: number;
    situationTimeElapsed: number;
    inSituation: boolean;
}

export type Linescore = {
    currentPeriod: number;
    currentPeriodOrdinal: string;
    currentPeriodTimeRemaining: string;
    periods: Period[];
    shootoutInfo: ShootoutInfo;
    teams: LinescoreTeams;
    powerPlayStrength: string;
    hasShootout: boolean;
    intermissionInfo: IntermissionInfo;
    powerPlayInfo: PowerPlayInfo;
}

export type SeriesSummary = {
    gameCode: number;
    gameLabel: string;
    gameNumber: number;
    gamePk: number;
    gameTime: Date;
    necessary: boolean;
    seriesStatus: string;
    seriesStatusShort: string;
}

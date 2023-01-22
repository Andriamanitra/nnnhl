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
    name: string;
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
    venue: Venue;
    content: Content;
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
    editorial: object;
    media: Media;
    highlights: object;
}

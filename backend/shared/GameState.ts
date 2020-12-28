export interface GameState {
    viewName: 'Home' | 'Woordenspel';
    minigameData?: {
        id: number,
        name: string;
        description: string;
        scores: {playerId: string; score: number, teamId: number}[];
        started: boolean;
        extraData: any;
    };
}
export interface GameState {
    viewName: 'Home' | 'Woordenspel' | 'Quiz' | 'Riser' | 'Guesser';
    teams: string[][];
    minigameData?: {
        id: number;
        name: string;
        description: string;
        scores: {playerId: string; score: number}[];
        started: boolean;
        extraData: any;
    };
}
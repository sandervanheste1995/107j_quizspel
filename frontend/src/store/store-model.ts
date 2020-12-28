import { GameState } from '@shared/GameState';

export interface StoreState {
    name: string;
    team: number;
    gameState: GameState;
}
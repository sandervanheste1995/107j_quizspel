import config from '../config';
import { GameState } from "../shared/GameState";
const fs = require('fs');

export interface ServerState {
    minigameIndex: number;
    minigameStack: any[];
    clientState: GameState;
};

export const state: ServerState = 
    fs.existsSync(config.gameStateSavefile) 
    ? JSON.parse(fs.readFileSync(config.gameStateSavefile))
    : JSON.parse(fs.readFileSync(config.defaultGameStateFile));
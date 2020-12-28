import config from '../config';
import { GameState } from "../shared/GameState";
const fs = require('fs');

const defaultState = {
    minigameIndex: -1,
    minigameStack: [],
    clientState: {
        viewName: 'Home',   
    }
};

export const state: { 
    minigameIndex: number,
    minigameStack: any[],
    clientState: GameState
} = fs.existsSync(config.gameStateSavefile) 
    ? JSON.parse(fs.readFileSync(config.gameStateSavefile))
    : defaultState;
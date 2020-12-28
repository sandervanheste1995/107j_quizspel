import config from '../config';
import { GameState } from "../shared/GameState";
const fs = require('fs');

export interface ServerState {
    minigameIndex: number;
    minigameStack: any[];
    clientState: GameState;
};

const defaultState: ServerState = {
    minigameIndex: -1,
    minigameStack: [],
    clientState: {
        teams: [[],[],[]],
        viewName: 'Home'
    }
};

if(!fs.existsSync(config.defaultGameStateFile)) {
    fs.writeFileSync(config.defaultGameStateFile, JSON.stringify(defaultState, null, 4) , 'utf-8');
}

export const state: ServerState = 
    fs.existsSync(config.gameStateSavefile) 
    ? JSON.parse(fs.readFileSync(config.gameStateSavefile))
    : JSON.parse(fs.readFileSync(config.defaultGameStateFile));
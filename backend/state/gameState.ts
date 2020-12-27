import config from '../config';
import { GameState } from "../shared/GameState";
const fs = require('fs');

const defaultState = {
    clientState: {
        viewName: 'Home'
    }
};

export const state: { 
    clientState: GameState
} = fs.existsSync(config.gameStateSavefile) 
    ? JSON.parse(fs.readFileSync(config.gameStateSavefile))
    : defaultState;
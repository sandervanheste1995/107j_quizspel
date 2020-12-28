import config from '../config';
import { GameState, teamCount } from "../shared/GameState";
const fs = require('fs');

const defaultState = {
    minigameIndex: -1,
    minigameStack: [],
    clientState: {
        teams: [],
        viewName: 'Home',
    }
};

for(var i = 0; i < teamCount; ++i) {
    defaultState.clientState.teams.push([]);
}

export const state: { 
    minigameIndex: number,
    minigameStack: any[],
    clientState: GameState
} = fs.existsSync(config.gameStateSavefile) 
    ? JSON.parse(fs.readFileSync(config.gameStateSavefile))
    : defaultState;
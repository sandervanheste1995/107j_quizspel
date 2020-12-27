import config from '../config';
import { GameState } from "../shared/GameState";
const fs = require('fs');

export const state: { 
    clientState: GameState
} = JSON.parse(fs.readFileSync(config.gameStateSavefile));
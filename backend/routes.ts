import config from './config';
import { io } from './index';
import { state } from './state/gameState';
import express from 'express';
import minigames from './resources/minigames';
import woordenspelRoutes from './minigames/woordenspel.routes';
import * as _ from 'underscore';
const fs = require('fs');

const routes = express.Router({ mergeParams: true });

routes.get('/state', (_,res) => {
    res.json(state.clientState);
});

routes.post('/reset', (_, res) => {
    const defaultState = JSON.parse(fs.readFileSync(config.defaultGameStateFile));
    state.clientState = defaultState.clientState;
    state.minigameIndex = defaultState.minigameIndex;
    state.minigameStack = defaultState.minigameStack;
    if (fs.existsSync(config.gameStateSavefile)) {
        fs.unlinkSync(config.gameStateSavefile);
    }
    io.emit('GAMESTATE_CHANGED', { reset: true });
    res.status(204).send();
});

routes.post('/setPlayer', (req, res) => {
    const hasTeam = state.clientState.teams.find(t => t.some(i => i === req.body.name.toLowerCase().trim())) !== undefined;
    if (!hasTeam) {
        state.clientState.teams[req.body.team - 1].push(req.body.name);
    }
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.status(204).send();
});

routes.post('/setNumberOfTeams', (req, res) => {
    if(state.clientState.teams.length !== req.body.numberOfTeams) {
        state.clientState.teams = [];
        for (var i = 0; i < req.body.numberOfTeams; ++i) {
            state.clientState.teams.push([]);
        }
        io.emit('GAMESTATE_CHANGED', state.clientState);
    };
    res.status(204).send();
});

routes.get('/minigames', (_, res) => {
    res.json(minigames.map(m => ({id: m.id, type: m.type, name: m.name})));
});

routes.post('/minigames', (req, res) => {
    const minigame = minigames.find(m => m.id === req.body.id);
    state.clientState.minigameData = {
        id: minigame.id,
        name: minigame.name,
        description: minigame.description,
        scores: [],
        started: false,
        extraData: { }
    };
    state.minigameIndex = state.minigameStack.length;
    state.minigameStack.push(state.clientState.minigameData);
    state.clientState.viewName = minigame.type as 'Woordenspel';
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.status(204).send();
});

routes.post('/minigame/toggle', (_, res) => {
    if (state.clientState.minigameData) {
        state.clientState.minigameData.started = !state.clientState.minigameData.started;
        io.emit('GAMESTATE_CHANGED', state.clientState);
    }
    res.status(204).send();
});

routes.post('/minigame/stop', (_, res) => {
    if (state.clientState.minigameData) {
        state.minigameStack[state.minigameIndex] = state.clientState.minigameData;
        delete state.clientState.minigameData;
        state.clientState.viewName = 'Home';
        io.emit('GAMESTATE_CHANGED', state.clientState);
    }
    res.status(204).send();
});

routes.use('/woordenspel', woordenspelRoutes);

export default routes;
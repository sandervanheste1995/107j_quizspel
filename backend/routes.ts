import { amountchanger } from './minigames/riser.routes';
import config from './config';
import { io } from './index';
import { state } from './state/gameState';
import express from 'express';
import minigames from './resources/minigames';
import woordenspelRoutes from './minigames/woordenspel.routes';
import quizRoutes, { loadCurrentQuizScreen } from './minigames/quiz.routes';
import riserRoutes from './minigames/riser.routes';
import guesserRoutes from './minigames/guesser.routes';
import * as _ from 'underscore';

const fs = require('fs');

const routes = express.Router({ mergeParams: true });

routes.get('/state', (_,res) => {
    res.json(state.clientState);
});

routes.get('/serverstate', (_,res) => {
    res.json(state);
});

routes.post('/reset', (_, res) => {
    const defaultState = JSON.parse(fs.readFileSync(config.defaultGameStateFile));
    state.clientState = defaultState.clientState;
    state.minigameIndex = defaultState.minigameIndex;
    state.minigameStack = defaultState.minigameStack;
    if (fs.existsSync(config.gameStateSavefile)) {
        fs.unlinkSync(config.gameStateSavefile);
    }
    if (amountchanger.interval) {
        clearInterval(amountchanger.interval);
        amountchanger.interval = undefined;
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

routes.post('/setminigames', (req, res) => {
    minigames.splice(0, minigames.length);
    for(var i = 0; i < req.body.length; ++i) {
        minigames.push(req.body[i]);
    }
    fs.writeFileSync(config.minigamesSavefile, JSON.stringify(minigames, null, 4) , 'utf-8');
    res.status(204).send();
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

    const extraData = state.clientState.minigameData.extraData;

    if (minigame.type === 'Quiz') {
        extraData.screenIndex = 0;
        extraData.teamsAnswered = [];
        extraData.currentScreen = { };
        loadCurrentQuizScreen();
    }

    if (minigame.type === 'Riser') {
        extraData.currentAmount = 0;
        extraData.maxAmount = minigame.maxAmount;
        extraData.claimedPlayers = [];
        extraData.teamWon = 0
    }

    if (minigame.type === 'Guesser') {
        const flattenedTeams = _.flatten(state.clientState.teams);
        extraData.numberOfPlayers = flattenedTeams.length;
        extraData.playerQueue = _.shuffle(flattenedTeams);
        extraData.imitatorQueue = _.shuffle(flattenedTeams);

        let limit = 1000000;
        let reshuffle = true;
        while(reshuffle && limit > 0) {
            reshuffle = false;
            for (var i = 0; i < extraData.playerQueue.length; ++i) {
                if (extraData.playerQueue[i] === extraData.imitatorQueue[i]) {
                    reshuffle = true;
                    extraData.imitatorQueue = _.shuffle(flattenedTeams);
                }
            }
            limit--;
        }

        extraData.playerText = '';
        extraData.imitatorText = '';
        extraData.isReversed = Math.random() >= 0.5;
        extraData.votes = [];
    }

    state.minigameIndex = state.minigameStack.length;
    state.minigameStack.push(state.clientState.minigameData);
    state.clientState.viewName = minigame.type as 'Woordenspel' | 'Quiz';
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.status(204).send();
});

routes.post('/minigame/toggle', (_, res) => {
    if (state.clientState.minigameData) {
        state.clientState.minigameData.started = !state.clientState.minigameData.started;

        if(state.clientState.viewName === 'Riser') {
            if(state.clientState.minigameData.started && !state.clientState.minigameData.extraData.teamWon) {
                amountchanger.interval = setInterval(amountchanger.func, 1000);
            } else {
                clearInterval(amountchanger.interval);
                amountchanger.interval = undefined;
            }
        }

        io.emit('GAMESTATE_CHANGED', state.clientState);
    }
    res.status(204).send();
});

routes.post('/minigame/stop', (_, res) => {
    if (state.clientState.minigameData) {
        state.minigameStack[state.minigameIndex] = state.clientState.minigameData;
        delete state.clientState.minigameData;
        state.clientState.viewName = 'Home';
        clearInterval(amountchanger.interval);
        amountchanger.interval = undefined;
        io.emit('GAMESTATE_CHANGED', state.clientState);
    }
    res.status(204).send();
});

routes.use('/woordenspel', woordenspelRoutes);
routes.use('/quiz', quizRoutes);
routes.use('/riser', riserRoutes);
routes.use('/guesser', guesserRoutes);

export default routes;
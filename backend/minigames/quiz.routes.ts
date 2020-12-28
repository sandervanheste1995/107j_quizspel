import { isInWords, addToTeamScore } from './../helpers/scores';
import express from "express";
import minigames from "../resources/minigames";
import { state } from '../state/gameState';
import { io } from '../index';

const routes = express.Router({ mergeParams: true });

export const loadCurrentQuizScreen = () => {
    const screenIndex = state.clientState.minigameData.extraData.screenIndex;
    const minigame = minigames.find(m => m.id === state.clientState.minigameData.id);

    if (!minigame || screenIndex < 0 || minigame.type !== 'Quiz' || screenIndex >= minigame.screens?.length) {
        state.clientState.minigameData.extraData.currentScreen = { };
        return;
    }

    const screenData = minigame.screens[screenIndex];
    state.clientState.minigameData.extraData.currentScreen = { ...screenData };

    // strip away the answers
    if(state.clientState.minigameData.extraData.currentScreen.answers) {
        state.clientState.minigameData.extraData.currentScreen.answers
        = state.clientState.minigameData.extraData.currentScreen.answers.map(a => a.text)
    }
    delete state.clientState.minigameData.extraData.currentScreen.answer;
}

routes.post('/schermDelta', (req, res) => {
    const minigame = minigames.find(m => m.id === state.clientState.minigameData.id);
    if(minigame?.type !== 'Quiz') {
        res.status(400).send();
    }

    const oldIndex = state.clientState.minigameData.extraData.screenIndex;
    const newIndex = Math.max(0, Math.min(oldIndex + req.body.delta, minigame.screens.length - 1));
    state.clientState.minigameData.extraData.screenIndex = newIndex;
    loadCurrentQuizScreen();

    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.status(204).send();
});

routes.get('/answer', (req, res) => {
    const minigame = minigames.find(m => m.id === state.clientState.minigameData.id);
    if(minigame?.type !== 'Quiz') {
        res.status(400).send();
    }

    const screenIndex = state.clientState.minigameData.extraData.screenIndex;
    const answered = state.clientState.minigameData.extraData.teamsAnswered;

    if(minigame.screens[screenIndex].type === 'info' || answered[screenIndex].length < state.clientState.teams.length) {
        res.status(400).send();
    }

    res.json(minigame.screens[screenIndex].type === 'open' ? 
        minigame.screens[screenIndex].answer[0] 
      : minigame.screens[screenIndex].answers.find(a => a.correct).text);
});

routes.post('/answer', (req, res) => {
    const minigame = minigames.find(m => m.id === state.clientState.minigameData.id);
    if(minigame?.type !== 'Quiz') {
        res.status(400).send();
    }

    const screenIndex = state.clientState.minigameData.extraData.screenIndex;
    const answered = state.clientState.minigameData.extraData.teamsAnswered;

    if(minigame?.screens[screenIndex].type === 'info') {
        res.status(204).send();
    }

    while(answered.length <= screenIndex) {
        answered.push([]);
    }

    const teamNumber = state.clientState.teams
        .findIndex(t => t.some(t => t.toLowerCase().trim() === req.body.name.toLowerCase().trim())) + 1;

    if(answered[screenIndex].some(a => a.teamNumber === teamNumber)) {
        res.json({success: false, message: 'Jouw team heeft al geantwoord'});
        return;
    }

    answered[screenIndex].push({ teamNumber, answer: req.body.answer });
    let success = false;
    if(minigame.screens[screenIndex].type === 'multiplechoice') {
        success = minigame.screens[screenIndex].answers.findIndex(a => a.correct) === req.body.answer;
    }
    if(minigame.screens[screenIndex].type === 'open') {
        success = isInWords(minigame.screens[screenIndex].answer, req.body.answer);
    }

    if(success) {
        addToTeamScore(req.body.name, minigame.screens[screenIndex].reward || 5);
    }

    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.json({ success });
})

export default routes;
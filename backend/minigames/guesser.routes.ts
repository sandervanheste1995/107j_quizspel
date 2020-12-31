import { addToTeamScore } from './../helpers/scores';
import { state } from './../state/gameState';
import express from "express";
import minigames from '../resources/minigames';
import { io } from '..';

const routes = express.Router({ mergeParams: true });

routes.post('/vote', (req, res) => {
    const data = state.clientState.minigameData.extraData;

    if (state.clientState.viewName !== 'Guesser') {
        res.status(400).send();
        return;
    }
    if (data.votes.find(v => v.playerId === req.body.name)) {
        res.status(204).send();
        return;
    }
    if(!data.playerQueue?.length) {
        res.status(204).send();
        return;
    }
    if(data.playerQueue[0] === req.body.name ||
       data.imitatorQueue[0] === req.body.name) {
           res.status(204).send();
           return;
    }

    data.votes.push({playerId: req.body.name, voteRight: req.body.voteRight});

    if (data.votes.length === data.numberOfPlayers - 2) {
        const minigame = minigames.find(m => m.id === state.clientState.minigameData.id);
        const numberCorrect = data.votes.filter(v => !data.isReversed ? v.voteRight : !v.voteRight).length;
        const enough = numberCorrect > (data.numberOfPlayers - 2) / 2;
        const all = numberCorrect === data.numberOfPlayers - 2;
        addToTeamScore(data.imitatorQueue[0], all ? minigame.allCorrect : (enough ? minigame.correct : 0));
    }

    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.status(204).send();
});

routes.post('/setText', (req, res) => {
    if (state.clientState.viewName !== 'Guesser') {
        res.status(400).send();
        return;
    }

    const data = state.clientState.minigameData.extraData;

     if(data.playerQueue[0] === req.body.name && data.playerText) {
        res.status(204).send();
        return;
     }
     if(data.imitatorQueue[0] === req.body.name && data.imitatorText) {
        res.status(204).send();
        return;
     }

     if(data.playerQueue[0] === req.body.name) {
        data.playerText = req.body.message;
     }
     else if(data.imitatorQueue[0] === req.body.name) {
        data.imitatorText = req.body.message;
     }
    
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.status(204).send();
});

routes.post('/nextPlayer', (req, res) => {
    if (state.clientState.viewName !== 'Guesser') {
        res.status(400).send();
        return;
    }

    const data = state.clientState.minigameData.extraData;

    if(data.playerQueue?.length > 0) {
        data.playerQueue.shift();
        data.imitatorQueue.shift();
        data.votes = [];
        data.playerText = '';
        data.imitatorText = '';
        io.emit('GAMESTATE_CHANGED', state.clientState);
    }

    res.status(204).send();
});

export default routes;
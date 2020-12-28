import { state } from './../state/gameState';
import express from "express";
import minigames from '../resources/minigames';
import { io } from '../index';

const routes = express.Router({ mergeParams: true });

function isInWords(words: string[], word: string): boolean {
    const stripped = word.toLowerCase().trim();
    return words.filter(w => stripped.includes(w)).length > 0;
}

routes.post('/try', (req,res) => {
    if (!state.clientState.minigameData) {
        res.status(400).send();
    }
    const minigame = minigames.find(m => m.id === state.clientState.minigameData.id);
    if(!minigame) {
        res.status(400).send();
    }

    if(!state.clientState.minigameData.extraData.doneWordsIdx) {
        state.clientState.minigameData.extraData.doneWordsIdx = [];
    }
    let doneWords = state.clientState.minigameData.extraData.doneWordsIdx;
    doneWords = doneWords.map(i => minigame.woorden[i]);

    if(doneWords.some(d => isInWords(d, req.body.word))) {
        res.json({success: false, message: 'Iemand was je voor'});
        return;
    }

    if(minigame.woorden.filter(w => isInWords(w, req.body.word)).length === 0) {
        res.json({success: false, message: 'Fout woord'});
        return;
    }

    state.clientState.minigameData.extraData.doneWordsIdx
    .push(minigame.woorden.findIndex(w => isInWords(w, req.body.word)));

    let playerScore = state.clientState.minigameData.scores.find(s => s.playerId === req.body.name);

    if(!playerScore) {
        state.clientState.minigameData.scores.push({ playerId: req.body.name, teamId: req.body.team, score: 0 });
        playerScore = state.clientState.minigameData.scores[state.clientState.minigameData.scores.length - 1];
    }
    playerScore.score += 10;
    
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.json({ success: true });
});

export default routes;
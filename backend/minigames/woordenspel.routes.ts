import { state } from './../state/gameState';
import express from "express";
import minigames from '../resources/minigames';
import { io } from '../index';

const routes = express.Router({ mergeParams: true });

function isInWords(words: string[], word: string): boolean {
    const stripped = word.toLowerCase().replace(/ /g,'')
    return words.filter(w => stripped.includes(w.toLowerCase())).length > 0;
}

routes.post('/try', (req,res) => {
    if (!state.clientState.minigameData) {
        res.status(400).send();
    }
    const minigame = minigames.find(m => m.id === state.clientState.minigameData.id);
    if(!minigame) {
        res.status(400).send();
    }

    if(!state.clientState.minigameData.extraData.doneWords) {
        state.clientState.minigameData.extraData.doneWords = [];
    }
    let doneWords = state.clientState.minigameData.extraData.doneWords;
    doneWords = doneWords.map(d => minigame.woorden[d.index]);

    if(doneWords.some(d => isInWords(d, req.body.word))) {
        res.json({success: false, message: 'Iemand was je voor'});
        return;
    }

    const matchIndex = minigame.woorden.findIndex(w => isInWords(w, req.body.word));
    if(matchIndex === -1) {
        res.json({success: false, message: 'Fout woord'});
        return;
    }

    state.clientState.minigameData.extraData.doneWords
    .push({
        index: matchIndex,
        word: minigame.woorden[matchIndex][0],
        playerId: req.body.name
    });

    let playerScore = state.clientState.minigameData.scores.find(s => s.playerId.toLowerCase().trim() === req.body.name.toLowerCase().trim());

    if(!playerScore) {
        state.clientState.minigameData.scores.push({ playerId: req.body.name, score: 0 });
        playerScore = state.clientState.minigameData.scores[state.clientState.minigameData.scores.length - 1];
    }
    playerScore.score += 5;
    
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.json({ success: true });
});

export default routes;
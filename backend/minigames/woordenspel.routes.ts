import { state } from './../state/gameState';
import express from "express";
import minigames from '../resources/minigames';
import { io } from '../index';
import { addToTeamScore, isInWords } from '../helpers/scores';

const routes = express.Router({ mergeParams: true });

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

    addToTeamScore(req.body.name, 5);
    
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.json({ success: true });
});

export default routes;
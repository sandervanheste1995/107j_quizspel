import express from "express";
import { io } from "..";
import { state } from "../state/gameState";

export const amountchanger = {
    interval: undefined,
    func: () => {
        if(state.clientState.minigameData.extraData.currentAmount === 
            state.clientState.minigameData.extraData.maxAmount) {
                clearInterval(amountchanger.interval);
                amountchanger.interval = undefined;
            } else {
                state.clientState.minigameData.extraData.currentAmount++;
            }

        io.emit('GAMESTATE_CHANGED', state.clientState);
    }
};

const routes = express.Router({ mergeParams: true });

routes.post('/claim', (req, res) => {
    if (state.clientState.viewName !== 'Riser' || state.clientState.minigameData.extraData.teamWon) {
        res.status(204).send();
        return;
    }
    state.clientState.minigameData.extraData.claimedPlayers.push(req.body.name);

    if (state.clientState.teams[req.body.team - 1]?.
        every(p => state.clientState.minigameData.extraData.claimedPlayers.find(cp => cp === p))) {
        state.clientState.minigameData.extraData.teamWon = req.body.team;
        state.clientState.minigameData.scores.
        push({playerId: req.body.name, score: state.clientState.minigameData.extraData.currentAmount});
        clearInterval(amountchanger.interval);
        amountchanger.interval = undefined;
    }
    io.emit('GAMESTATE_CHANGED', state.clientState);
    res.status(204).send();
});

export default routes;

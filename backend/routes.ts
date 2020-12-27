import { state } from './state/gameState';
import express from 'express';

const routes = express.Router({ mergeParams: true });

routes.get('/state', (_,res) => {
    res.json(state.clientState);
});

routes.post('/state', (req, res) => {
    state.clientState = req.body;
    res.status(204).send();
});

export default routes;
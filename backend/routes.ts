import { state } from './state/gameState';
import express from 'express';

const routes = express.Router({ mergeParams: true });

routes.get('/state', (_,res) => {
    res.json(state.clientState);
});

export default routes;
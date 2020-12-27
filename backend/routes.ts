import express from 'express';

const routes = express.Router({ mergeParams: true });

routes.get('/message', (req,res) => {
    res.json({ message: 'Welkom bij het 107J Nieuwjaarsspel!'});
});

export default routes;
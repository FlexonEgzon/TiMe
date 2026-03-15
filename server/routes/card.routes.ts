import express from 'express';
import { createCard, getCards } from '../controllers/card.controller.js';

const router = express.Router();

router.get('/cards', getCards);

router.post('/cards', createCard);

//router.patch('/cards/:id')

//router.post('time-entries/start')

//router.post('time-entries/stop')

export default router;
/**
 * Hier definierst du nur:

URL

HTTP-Methode

welcher Controller aufgerufen wird

Beispiel-Denke:

GET /cards


POST /cards

PATCH /cards/:id

POST /time-entries/start

POST /time-entries/stop

Wichtig:

In Routes keine Business-Logik.
 */

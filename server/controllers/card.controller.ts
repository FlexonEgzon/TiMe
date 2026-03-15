import { cardService } from '../services/card.service.js';
import type { Request, Response } from 'express';

const createCard = async (req: Request, res: Response) => {
  const card = await cardService.createCard(req.body);
  res.status(201).json(card);
};

const getCards = async (req: Request, res: Response) => {
  const cards = await cardService.getCards();
  res.status(200).json(cards);
};

export { createCard, getCards };

/**
 * Controller sind die Schicht zwischen Request und Service.

Aufgabe:

req auslesen

Parameter validieren / weitergeben

Service aufrufen

Response senden

Wichtig:

Controller sollen schlank bleiben.

Sie machen nicht:

keine Prisma Queries direkt

keine komplexe Business-Logik
 */

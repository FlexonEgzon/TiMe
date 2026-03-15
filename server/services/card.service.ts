import { prisma } from '../lib/prisma.js';
import type { CreateCardsDto } from '../types/card.types.js';

export const cardService = {
  async getCards() {
    return prisma.timeCard.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async createCard(data: CreateCardsDto) {
    return prisma.timeCard.create({
      data: {
        title: data.title,
        description: data.description ?? '',
      },
    });
  },
};

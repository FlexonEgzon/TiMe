import { defineStore } from "pinia";
import type { TimeCard }  from './types/TimeCard';

export const useCardStore = defineStore('cardStore',{
    state: () => ({
        cards: [] as Array<TimeCard>
    }),
    actions: {
        createCard(){
            const newCard: TimeCard = { 
                id: Date.now(),  //Default
                title: 'Stable Card: ' + this.cards.length, //Hardcode for now
                time: 0,
                isRunning: true,
            }
            return newCard;
        },

        addCard() {
            const newCard = this.createCard(); //Create Card
            this.cards.push(newCard);
        
        },
        removeCard(cardId: number){
            const index = this.cards.findIndex( x => x.id === cardId);
            if(index === -1)
                return;
            else
            this.cards.splice(index, 1);
          
        }
    }
})


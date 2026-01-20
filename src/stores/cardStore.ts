import { defineStore } from "pinia";
import type { TimeCard }  from './types/TimeCard';

let tickerId: ReturnType<typeof setInterval> | null = null; // Stores the reference of current intervall

export const useCardStore = defineStore('cardStore',{
    state: () => ({
        cards: [] as Array<TimeCard>,
    }),
    
    actions: {
        createCard(){ //Creates a new Card Instance with default values
            const newCard: TimeCard = { 
                id: Date.now(),  //Default
                title: 'Stable Card: ' + this.cards.length, //Hardcode for now
                timeMs: 0,
                isRunning: false,
                lastTickAt: undefined
            }
            return newCard;
        },
        
        addCard() {
            const newCard = this.createCard(); //Create Card instance
            this.cards.push(newCard);
            this.startCard(newCard.id);
        },
        startCard(cardId: number){
            //Check if a Card is currently Running
            const CardRunning = this.cards.find(x => x.isRunning === true)  //Check if Card is currently running 
            if(CardRunning !== undefined){
                if(CardRunning.id === cardId) //Prevent Doubleclick Start on the Same Card
                    return console.log("Allready Running");
                else
                this.stopCard(CardRunning.id); // Stop the current Card
                }
            //Find Current card 
            const currCard = this.cards.find( x => x.id === cardId);
            if(currCard && currCard.isRunning === false){
                currCard.isRunning = true; //set True when Card has started Tracking
                currCard.lastTickAt = Date.now(); // TimeStamp when card was started at last
                
                this.ensureTickerRunning(); // Start Ticker    
            }

        },
        stopCard(cardId: number){
            const currCard = this.cards.find( x => x.id === cardId);
            if(currCard && currCard.isRunning === true && currCard.lastTickAt !== undefined){
                
                const deltaMs = Date.now() - currCard.lastTickAt; //Get The time the tracker has been running for the last tick
                currCard.timeMs += deltaMs; //Akkumulate the time
                   
                currCard.isRunning = false;
                currCard.lastTickAt = undefined;
                this.stopTickerIfIdle() // Stop Ticker
            }
            else
                return console.log("No Card is Running");
            

        },

        ensureTickerRunning(){ //Start Timer Function and set the tickerId

          tickerId ??= setInterval(() => this.tick(), 1000);
        },

        stopTickerIfIdle(){
            if(tickerId !== null){
                clearInterval(tickerId); //Clear Timer intervall
                tickerId = null; //Reset tickerId
                }
            },


        tick(){
            console.log("Called");
            let currCard = this.cards.find(x => x.isRunning === true); //Find Card that is currently runnning
            if(currCard && currCard.lastTickAt !== undefined){
                const deltaMs = Date.now() - currCard.lastTickAt;
                currCard.timeMs += deltaMs; //Add DeltaTime to TimeMs of current Card
                currCard.lastTickAt = Date.now(); //Reset timer for next intervall count
                console.log("Card TimeMs " + currCard.timeMs);
            }
        },

       


        removeCard(cardId: number){
            const index = this.cards.findIndex( x => x.id === cardId);
            if(index === -1)
                return;
            else
            this.cards.splice(index, 1);
            //Reset Ticker
            this.stopTickerIfIdle();
          
        }
    }
})


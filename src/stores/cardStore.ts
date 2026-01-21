import { defineStore } from 'pinia'
import type { TimeCard } from './types/TimeCard'

let tickerId: ReturnType<typeof setInterval> | null = null // Stores the reference of current intervall

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [] as Array<TimeCard>,
  }),

  actions: {
    //Intern function helpers START
    getCardById(cardId: number) {
      return this.cards.find((x) => x.id === cardId) //Find Card with given ID
    },
    getRunningCard() {
      return this.cards.find((x) => x.isRunning === true) //Find Card that is currently runnning
    },
    //Intern function helpers END

    //Change Title Function
    renameCard(cardId: number, title: string) {
      const currCard = this.getCardById(cardId)
      if (currCard) {
        title = title.trim() //Trim Spaces around the Title
        if (!title) {
          currCard.title = 'Untitled Card'
          return
        }
        if (currCard.title !== title) currCard.title = title //set New Title
      }
    },

    createCard() {
      //Creates a new Card Instance with default values
      const newCard: TimeCard = {
        id: Date.now(), //Default
        title: 'Stable Card: ' + this.cards.length, //Hardcode for now
        timeMs: 0,
        isRunning: false,
        lastTickAt: undefined,
      }
      return newCard
    },

    addCard() {
      const newCard = this.createCard() //Create Card instance
      this.cards.push(newCard)
      this.startCard(newCard.id)
    },
    startCard(cardId: number) {
      //Check if a Card is currently Running
      const runningCard = this.getRunningCard() //Check if Card is currently running
      if (runningCard !== undefined) {
        if (runningCard.id !== cardId) this.stopCard(runningCard.id) // Stop the current Card
      }
      //Find Current card
      const currCard = this.getCardById(cardId)
      if (currCard && currCard.isRunning === false) {
        currCard.isRunning = true //set True when Card has started Tracking
        currCard.lastTickAt = Date.now() // TimeStamp when card was started at last

        this.ensureTickerRunning() // Start Ticker
      }
    },
    stopCard(cardId: number) {
      const currCard = this.getCardById(cardId)
      if (currCard && currCard.isRunning === true && currCard.lastTickAt !== undefined) {
        const nowTime = Date.now()
        const deltaMs = nowTime - currCard.lastTickAt //Get The time the tracker has been running for the last tick
        currCard.timeMs += deltaMs //Akkumulate the time

        currCard.isRunning = false
        currCard.lastTickAt = undefined
        this.stopTickerIfIdle() // Stop Ticker
      }
    },

    ensureTickerRunning() {
      //Start Timer Function and set the tickerId

      tickerId ??= setInterval(() => this.tick(), 1000)
    },

    stopTickerIfIdle() {
      let runningCard = this.getRunningCard()
      if (runningCard === undefined && tickerId !== null) {
        clearInterval(tickerId) //Clear Timer intervall
        tickerId = null //Reset tickerId
      }
    },

    tick() {
      let currCard = this.getRunningCard()

      if (!currCard) {
        this.stopTickerIfIdle()
        return
      }

      if (currCard && currCard.lastTickAt !== undefined) {
        const nowTime = Date.now()
        const deltaMs = nowTime - currCard.lastTickAt
        currCard.timeMs += deltaMs //Add DeltaTime to TimeMs of current Card
        currCard.lastTickAt = nowTime //Reset timer for next intervall count
      }
    },

    removeCard(cardId: number) {
      const index = this.cards.findIndex((x) => x.id === cardId)
      if (index === -1) return
      else {
        this.stopCard(cardId)
        this.cards.splice(index, 1)
        this.stopTickerIfIdle() //For Bug and Hosting Reasons is function called again here
      }
    },
  },
})

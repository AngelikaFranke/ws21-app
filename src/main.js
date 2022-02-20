import { createApp } from 'vue';
// import router from './lib/router';
// import store from './lib/store';
import './assets/index.css';

import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Calculator from './pages/Calculator.vue'
import Pokedex from './pages/Pokedex.vue'
import Guesser from './pages/Guesser.vue'
import Game from './pages/Game.vue'
import { createStore } from 'vuex';
import swal from "sweetalert";
import axios from "axios";

// Create a new store instance
const API = 'https://deckofcardsapi.com/api/deck/new/shuffle/';

// Cardsymbol switch
function cardSymbol(card) {
  switch (card.suit) {
    case 'CLUBS':
      return '♣️';
    case 'SPADES':
      return '♠️';
    case 'DIAMONDS':
      return '♦️';
    case 'HEARTS':
      return '♥️';
    default:
      break;
  }
}

function validateGuess(card, nextGuess) {
    const colors = {
        'SPADES': 'black',
        'HEARTS': 'red',
        'CLUBS': 'black',
        'DIAMONDS': 'red'
    }

    const cardColor = colors[card.suit]

    return cardColor == nextGuess

}


const store = createStore({
    state() {
        return {
            guesser: {
                deckId: undefined,
                cards: [],
                points: 0,
                guesses: 0,
                nextGuess: undefined,
            },
        };

    },

    getters: {
        drawCardAPI(state) {
            return `https://deckofcardsapi.com/api/deck/${state.guesser.deckId}/draw/?count=1`;
        },
    },

    mutations: {
        incrementPoints(state){
            state.guesser.points++;
        },
        incrementGuesses(state) {
            state.guesser.guesses++;
        },
        setDeckId(state, deckId) {
            state.guesser.deckId = deckId
        },
        setNextGuess(state, color) {
            state.guesser.nextGuess = color;
        },
        pushNewCard(state, newCard) {
            state.guesser.cards.push(newCard)
        }
    },
    actions: {
        setNextGuess({ commit }, color) {
            commit('setNextGuess', color)
        },
        async getDeck({ commit }) {
            const { deck_id } = await fetch(API).then((r) => r.json());
            commit('setDeckId', deck_id)
        },
        async drawCard({ state, commit, getters }) {
            const { cards } = await fetch(getters.drawCardAPI).then((r) => r.json()
            );

            // +1 the guess counter
            commit('incrementGuesses')

            // +1 the point counter if you guessed correctly
            if(validateGuess(cards[0], state.guesser.nextGuess))
            {
                commit('incrementPoints')
            }

            // Here's a clean card object that has a nice symbol
            const cleanCard = {
                value: cards[0].value,
                symbol: cardSymbol(cards[0]),
                image: cards[0].image,
            }

            commit('pushNewCard', cleanCard)

        },
    }
});

const router = createRouter({
  history: createWebHistory('configure-admin'),
  routes: [
    { path: '/', component: Home },
    { path: '/pokedex', component: Pokedex },
    { path: '/calculator', component: Calculator },
    { path: '/guesser', component: Guesser },
    { path: '/game', component: Game },
  ],
})


const app = createApp({});
app.use(router);
app.use(store);
app.mount('#app');





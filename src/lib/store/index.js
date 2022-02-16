import { createStore} from 'vuex';
import { validateGuess, cardSymbol} from '../game';
import mutations from './mutations';
import actions from './actions';

// Create a new store instance
const API = 'https://deckofcardsapi.com/api/deck/new/shuffle/';


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

export default store;
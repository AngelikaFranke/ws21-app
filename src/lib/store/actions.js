import {validateGuess, cardSymbol} from '/..game';


// Create a new store instance
const API = 'https://deckofcardsapi.com/api/deck/new/shuffle/';

function getDeckAPI() {
    return API
}

function getCardAPI() {
    return `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
}



export default{
    setNextGuess({ commit }, color) {
        commit('setNextGuess', color)
    },
    async getDeck({ commit }) {
        const { deck_id } = await fetch(getDeckAPI()).then((r) => r.json());
        commit('setDeckId', deck_id)
    },
    async drawCard({ state, commit, getters }) {
        const { cards } = await fetch(getCardAPI(state.guesser.deckId)).then((r) => r.json()
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
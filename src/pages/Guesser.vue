<script>
import { mapState, mapActions, mapMutations } from "vuex";


export default {
    computed: {
        ...mapState(['guesser']),

    },

    methods: {
        ...mapActions(['getDeck', 'setNextGuess', 'drawCard'])
    },
};
</script>

<template>
    <h1>The Great Guesser Game!</h1>


    <div class="flex content-center justify-center">
    <button @click="getDeck">Get a new Deck</button>
    </div>
<div class="flex content-center justify-center my-5">
    <div v-if="guesser.deckId">
        <div class="flex content-center justify-center">
        <button @click="setNextGuess('red')" class="bg-red-500 hover:bg-red-400 text-white">Guess Red</button>
        <br />
        <button @click="setNextGuess('black')" class="bg-gray-900 hover:bg-gray-800 text-white">Guess Black</button>
        <br />
        <button v-if="guesser.nextGuess" @click="drawCard">Draw a card</button>
        </div>

    <div class="flex content-center justify-center">
        <h2>Guesses: {{ guesser.guesses }}</h2>
        <h2>Points: {{ guesser.points }}</h2>
        <h2>Your next guess is: {{ guesser.nextGuess }}</h2>
    </div>

    {{ $store.state.points }}

<div class="flex flex-rows">
    <div  v-for="(card, index) in guesser.cards" :key="index" class="basis-1/4 m-1">
        {{ card.value }} of {{ card.symbol }}
        <img :src="card.image" :alt="card.value" />
 </div>
 </div>

    {{ nextGuess }}
    </div>
    <div v-else  class="flex content-center justify-center">Please draw a new deck!</div>

</div>
</template>
    <style>
        img {
            width: 100px;
        }
    </style>



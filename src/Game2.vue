<template>
<h1>Blackjack</h1>
<!-- <div v-if ="!gameOver" id="game">
<div id="game">
<div id="playerOne">
    <h4>Player One</h4>
    <div class="card">
        <img :src="cardOne?.images?.png"/>
    </div>

    <div class="score">Show Score Player One: {{ scoreOne }}</div>

    <button @click="getCards()">Draw Cards
        <div>
            <img :src="cardTwo?.images?.png"/>
        </div>
    </button>

    <button @click="getCards2()">Hit it</button>

        <div class="score">Show Score Player Two: {{ scoreTwo }}</div>

    <div v-if="gameOver">
    <button @click="getDeck()">Play Game</button>
</div>
</div>

</div> -->

<div v-if ="!gameOver" id="gamePlayerOne">
    <button v-if ="!startPlayerTwo" @click="getCards()">Player one draw a Card</button>
    <button v-if ="!startPlayerTwo" @click="playerTwo">Hit It</button>
    <div v-if="startPlayerOne">
            <img :src="cardOne?.images?.png"/>
    <div class="score">Score Player One: {{ scoreOne }}</div>

    <div id="gamePlayerTwo">
        <div v-if="startPlayerTwo">
                <img :src="cardTwo?.images?.png"/>
            <div class="score">Score Player Two: {{ scoreTwo }}</div>
                <button @click="getCards2()">Player Two draw a Card</button>
        </div>
    </div>

    </div>
</div>

<button @click="getDeck()">Get a new Deck</button>

<div class ="winsAndLosses">
    <div>Wins Player One: {{winsPlayerOne}}</div>
    <div>Wins Player Two: {{winsPlayerTwo}}</div>
</div>

</template>


<script>
import {ref} from "vue";
import axios from "axios";
import swal from "sweetalert";

function translateCards(value){
    switch (value) {
        case "JACK":
            value = "11";
            break;
        
        case "QUEEN":
            value = "12";
            break;
        
        case "KING":
            value = "13";
            break;

        case "ACE":
            value = "14";
            break;

            default:
                break;
    }
    return value;
}

//let winsPlayerOne = 0;
//let winsPlayerTwo = 0;

export default {
    name: "App",
    setup() {
        let gameOver = ref(true);
        let startPlayerOne = ref(true);
        let startPlayerTwo = ref(true),  
        cardOne = ref({}),
        cardTwo = ref({}),
        deckID = ref(null),
        winsPlayerOne = ref(0),
        winsPlayerTwo = ref(0),
        scoreOne = ref(0),
        scoreTwo = ref(0);

        console.log(
            winsPlayerOne,
            winsPlayerTwo
        );

        async function getDeck(){
            gameOver.value = false;
            startPlayerOne.value = false;
            startPlayerTwo.value = false;
            const { data } = await axios.get(
                'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
            );
            deckID.value = data.deck_id; 
            console.log(data);
            scoreOne.value = 0;
            scoreTwo.value = 0;
        }
        async function getCards(){
            startPlayerOne.value = true;
            const {data} = await axios.get(
                'https://deckofcardsapi.com/api/deck/' + deckID.value + '/draw/?count=1'
            );
            const remaining = data.remaining
            const { cards } = data;
            cardOne.value = cards[0];
            console.log(remaining)
            const valueCard = parseInt(translateCards(cardOne.value.value));
            scoreOne.value = scoreOne.value + valueCard;
            console.log(scoreOne.value)

            if(scoreOne.value > 21) {
                setTimeout(() => {
                    swal("Player Two wins!")
                    gameOver.value = true;
                    winsPlayerTwo.value = winsPlayerTwo.value + 1;
                    console.log(winsPlayerTwo)
                }, 500);
            }
        }
        async function playerTwo(){
            startPlayerTwo.value = true;
        }

        async function getCards2(){
            const {data} = await axios.get(
                'https://deckofcardsapi.com/api/deck/' + deckID.value + '/draw/?count=1'
            );
            const remaining = data.remaining
            const { cards } = data;
            cardTwo.value = cards[0];
            console.log(remaining)
            const valueCard = parseInt(translateCards(cardTwo.value.value));
            scoreTwo.value = scoreTwo.value + valueCard;
            console.log(scoreTwo.value)

  
            // if(scoreTwo.value > 21) {
            //     gameOver.value = true;
            //     //scoreTwo.value = 0;
            //       swal("Player One wins!")
                  
            // }

            if(scoreTwo.value > 21) {
                setTimeout(() => {
                    swal("Player One wins!")
                    gameOver.value = true;
                    winsPlayerOne.value = winsPlayerOne.value + 1;
                }, 500);
            }

            if(scoreTwo.value > scoreOne.value && scoreTwo.value < 22) {
                setTimeout(() => {
                    swal("Player Two wins!")
                    gameOver.value = true;
                    winsPlayerTwo.value = winsPlayerTwo.value + 1;
                }, 500);
            }

            if(scoreTwo.value > 15 && scoreTwo.value == scoreOne.value) {
                setTimeout(() => {
                    swal("Draw!")
                    gameOver.value = true;
                }, 500);
            }

            // if(scoreTwo.value > scoreOne.value && scoreTwo.value < 22) {
            //     gameOver.value = true;
            //       swal("Player Two wins!")
            // }

            // if(scoreTwo.value > 15 && scoreTwo.value == scoreOne.value) {
            //     gameOver.value = true;
            //       swal("Draw!")
            // }
        }

        function gameOverTest(){
            
            if(scoreOne.value > 21) {
                gameOver.value = true;
                scoreOne.value = 0;
            }
            if(scoreTwo.value > 21) {
                gameOver.value = true;
                scoreTwo.value = 0;
            }
            if(scoreTwo.value > scoreOne.value) {

            }

        }

        return { 
            getCards, 
            cardOne, 
            gameOver, 
            getDeck,
            scoreOne,
            cardTwo,
            scoreTwo,
            getCards2,
            startPlayerOne,
            startPlayerTwo,
            playerTwo,
            winsPlayerOne,
            winsPlayerTwo }; 
    },

};



</script>

<style scoped>

</style>
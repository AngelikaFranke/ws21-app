<template>
<h1>Blackjack</h1>

<div  class="flex content-center justify-center">
    <p>Explanation: Get as close as possible to 21 without scoring more points. 
        If you cross 21 you automatically lose. <br> 
        If you don't want to draw new cards click "Stick" and the second player, tries to 
        get more points than you while staying under 21. <br>
    </p>

</div>

    <div class="flex content-center justify-center m-5">
    <button @click="getDeck()">Get a new Deck</button>
    </div>

    
    <div class ="flex content-center justify-center m-5 space-x-10">
        <div class="text-lg text-red-900">Wins Player: {{winsPlayerOne}}</div>
        <div  class="text-lg text-red-900">Wins Dealer: {{winsPlayerTwo}}</div>
    </div>

<div v-if ="!gameOver" id="gamePlayerOne">
    <div class ="flex content-center justify-center space-x-10">
    <button v-if ="!startPlayerTwo" @click="getCardPlayerOne()">Draw a Card</button>
    <button v-if ="!startPlayerTwo" @click="myLoop()">Stick</button>

    </div>
    <div class ="flex content-center justify-center my-10">
    
    <div 
     class="mx-10">
            <img :src="cardOne?.images?.png" />
                <div class="my-5">Score Player: {{ scoreOne }}</div>
    </div>

    <div 
    v-if="startPlayerTwo"
     class="mx-10">
            <img :src="cardTwo?.images?.png" />  
                <div class="my-5">Score Dealer: {{ scoreTwo }}</div>
    </div> 

    </div>
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

            i = 0;
        }

        async function getCard(){
                const {data} = await axios.get(
                'https://deckofcardsapi.com/api/deck/' + deckID.value + '/draw/?count=1'
            );
            console.log(startPlayerOne.value)
            console.log(startPlayerTwo.value)
            const remaining = data.remaining
            const { cards } = data;

            const valueCard = parseInt(translateCards(cards[0].value));
            console.log(valueCard)
            cardTwo.value = cards[0];

            if(startPlayerOne.value = true && startPlayerTwo.value != true){
                cardOne.value = cards[0];
                scoreOne.value = scoreOne.value + valueCard;


                } else {
                cardOne.value = cardOne.value

                scoreTwo.value = scoreTwo.value + valueCard;       
                }

            winConditions()
        }

        async function getCardPlayerOne(){
            startPlayerOne.value = true;      
            getCard();
            }


    let i = 0;                 

        async function myLoop() {
            // startPlayerOne.value = false;
            startPlayerTwo.value = true;         
        setTimeout(function() {   
            console.log('hello');

            i++;
            console.log(i)   
            if (i < 10) {           
            myLoop();
            getCard();
            //getCards2(); 

            }                      
        }, 1000)}

        function winConditions(){
            if(scoreOne.value > 21) {
                setTimeout(() => {
                    swal("Dealer wins!")
                    gameOver.value = true;
                    winsPlayerTwo.value = winsPlayerTwo.value + 1;
                    console.log(winsPlayerTwo)
                }, 500);
            }

            if(scoreTwo.value > 21) {
                setTimeout(()=> {
                    swal("Player wins!")
                    gameOver.value = true;
                    winsPlayerOne.value = winsPlayerOne.value + 1;
                    i = 11;
                    }, 500);
            }

            if(scoreTwo.value > scoreOne.value && scoreTwo.value < 22) {
                setTimeout(() => {
                    swal("Dealer wins!")
                    gameOver.value = true;
                    winsPlayerTwo.value = winsPlayerTwo.value + 1;
                    i = 11;
                }, 500);
            }

            if(scoreTwo.value > 15 && scoreTwo.value == scoreOne.value) {
                setTimeout(() => {
                    swal("Draw!")
                    gameOver.value = true;
                    i = 11;
                }, 500);
            }
        }

        return { 
            // getCard, 
            cardOne, 
            gameOver, 
            getDeck,
            scoreOne,
            cardTwo,
            scoreTwo,
            //getCards2,
            startPlayerOne,
            startPlayerTwo,
            // playerTwo,
            winsPlayerOne,
            winsPlayerTwo,
            axios,
            myLoop,
            getCardPlayerOne }; 
    },

};

</script>

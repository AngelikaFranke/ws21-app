<template>
  <div>
    <div class="reinit" @click.prevent="reinitLocalStorage"></div>
    <h1>Blackjack</h1>
    <div v-if="phase === 2">
      <div>Wins: {{wins}}</div>
      <div>Losses: {{losses}}</div>
      <button @click.prevent="reset">Play again</button>
    </div>
    <form>
      <div class="chips-available">Available: 💵<span class="chips">{{ chips }}</span></div>
      <div v-if="phase === 0">
        <enter-stake
          v-on:next="startGame"
          :phase="phase"
          :chips="chips"
        />
      </div>
      <div v-if="phase === 0 && chips === 0">
        You have no chips left 😢 <a href="">Click here to buy more</a>
      </div>
    </form>
    <div class="main" v-if="phase === 1 || phase === 2">
      <div class="cards-section">
        <div class="cards-and-count you">
          <h3>You:</h3>
          <cards-container :cards="playerCards" />
          <div>({{playerScore}})</div>
        </div>
        <div class="cards-and-count cpu">
          <h3>CPU:</h3>
          <cards-container :cards="dealerCards" />
          <div>({{dealerScore}})</div>
        </div>
      </div>
      <stick-twist-buttons
        v-on:stick="stick"
        v-on:twist="twist"
        :buttonsDisabled="buttonsDisabled"
      />
    </div>
  </div>
</template>

<script>
import { sample } from "lodash";
import availableCards from "../availableCards";
import CardsContainer from "./CardsContainer.vue";
import EnterStake from "./EnterStake.vue";
import StickTwistButtons from "./StickTwistButtons.vue";
import swal from "sweetalert";

// TODO: Ace high
// TODO: No repeated cards if they've already been dealt

export default {
  components: {
    "cards-container": CardsContainer,
    "enter-stake": EnterStake,
    "stick-twist-buttons": StickTwistButtons
  },
  data() {
    return {
      chips: Number(localStorage.getItem("chips")) || 100,
      stake: null,
      userStake: null,
      playerCards: [],
      dealerCards: [],
      phase: 0,
      wins: Number(localStorage.getItem("wins")) || 0,
      losses: Number(localStorage.getItem("losses")) || 0,
      buttonsDisabled: false
    };
  },
  methods: {
    reset: function() {
      this.stake = null;
      this.userStake = null;
      this.playerCards = [];
      this.dealerCards = [];
      this.phase = 0;
      this.buttonsDisabled = false;
    },
    reinitLocalStorage: function() {
      localStorage.removeItem("chips");
      localStorage.removeItem("wins");
      localStorage.removeItem("losses");
    },
    startGame: function(stake) {
      this.phase = 1;
      this.chips -= stake;
      localStorage.setItem("chips", this.chips);
      this.stake = stake;
      this.setPlayerCards();
      this.setDealerCards();
    },
    setPlayerCards: function() {
      this.playerCards.push(sample(availableCards));
      this.playerCards.push(sample(availableCards));
    },
    setDealerCards: function() {
      this.dealerCards.push(sample(availableCards));
    },
    stick: function() {
      this.buttonsDisabled = true;
      // Set interval so that the dealer's cards
      // come out gradually, not immediately.
      this.interval = setInterval(() => {
        if (this.dealerScore <= 17) {
          this.dealerCards.push(sample(availableCards));
        } else {
          clearInterval(this.interval);

          // All cards possible have been dealt,
          // so here we need to check who's won
          // and what message to send the player.
          doWinOrLossChecks();
        }
      }, 500);

      const doWinOrLossChecks = () => {
        if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
          this.wins++;
          localStorage.setItem("wins", this.wins);
          this.chips += this.stake * 2;
          localStorage.setItem("chips", this.chips);
          swal("You won!");
        } else if (this.dealerScore > this.playerScore) {
          this.losses++;
          // No need to set chips in localStorage here
          // because it was taken out when you set a stake.
          localStorage.setItem("losses", this.losses);
          swal("You lose!");
        } else if (this.dealerScore === this.playerScore) {
          this.wins++;
          localStorage.setItem("wins", this.wins);
          this.chips += this.stake;
          localStorage.setItem("chips", this.chips);
          swal("You drew with the dealer!");
        }
        this.phase = 2;
      };
    },
    twist: function() {
      this.buttonsDisabled = true;
      this.playerCards.push(sample(availableCards));

      // Only logic to check here is if the player has lost.
      // Similar to stick function, except it's manual not
      // automatic.
      setTimeout(() => {
        if (this.playerScore > 21) {
          this.losses++;
          swal("You lose!");
          this.phase = 2;
        } else {
          this.buttonsDisabled = false;
        }
      }, 500);
    }
  },
  computed: {
    playerScore() {
      return this.playerCards.reduce((acc, cur) => {
        return acc + cur.values[0];
      }, 0);
    },
    dealerScore() {
      return this.dealerCards.reduce((acc, cur) => {
        return acc + cur.values[0];
      }, 0);
    }
  }
};
</script>

<style scoped>
.main {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.cards-section {
  display: flex;
  justify-content: center;
}
.cards-and-count {
  display: flex;
  flex-direction: column;
  margin: 10px;
  min-width: 200px;
}
.you {
  background-color: #eaf1fc;
}
.cpu {
  background-color: #fffbf4;
}
.card {
  font-size: 100px;
}
.chips-available {
  font-size: 30px;
}
.chips {
  color: goldenrod;
}
.reinit {
  cursor: help;
  height: 100px;
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>

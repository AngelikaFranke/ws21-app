<template>
    <div class="cards-container">
      <span class="card" v-for="card in cards">
        <span :class="card.type === 'diamonds' || card.type === 'hearts' ? 'red' : 'black'">
          {{getUnicodeCard(card)}}
        </span>
      </span>
    </div>
</template>

<script>
import unicodeCards from "../unicodeCards";

export default {
  props: {
    cards: Array
  },
  methods: {
    getUnicodeCard: function(card) {
      return unicodeCards[`${card.name}_${card.type}`];
    }
  },
  computed: {
    getCardColor: function() {
      return "bert";
    }
  }
};
</script>

<style>
.card {
  font-size: 140px;
}
.cards-container {
  display: flex;
}
.black {
  color: #161616;
}
.red {
  color: #990000;
}
</style>

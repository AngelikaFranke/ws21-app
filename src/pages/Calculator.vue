

<script>
const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default {
  data() {
    return {
      lastNumber: 0,
      currentNumberArray: [],
      numberKeys,
    };
  },

  computed: {
    currentNumber() {
      // We turn the array into a number so we don't need to convert
      // any other istance of the currentNumber
      return parseInt(this.currentNumberArray.join(""), 10) || 0;
    },
  },

  methods: {
    pushNumber(numberStr) {
      // Just add the last number to the array
      this.currentNumberArray.push(numberStr);
    },

    addNumber() {
      // Store the currentNumber in memory of the lastNumber
      this.lastNumber = this.currentNumber;
      this.currentNumberArray = [];
    },

    showResult() {
      const result = this.lastNumber + this.currentNumber;
      this.currentNumberArray = [...String(result)];
      // Logic here has a lot of room for improvements
    },

  },

};

</script>


<template>
<div>
    <h1>Calculator Page</h1>

    <div>
      <strong>last stored number</strong>
      <p class="displayNumber">{{ lastNumber }}</p>
    </div>

    <div>
      <strong>Display Number</strong>
      <p class="displayNumber">{{ currentNumber }}</p>
    </div>

    <br />


    <button class ="

            p-2.5 
            space-x-4
            bg-gray-100
            hover:bg-green-100
            rounded-md
            hover:shadow-xl
            transition-shadow
            duration-1000
            "

      v-for="number in numberKeys"
      @click="pushNumber(number)"
      :key="number"
    >
      {{ number }}
    </button>

    <br />

    <button
    class ="p-2.5 
            space-x-4
            bg-gray-100
            hover:bg-green-100
            rounded-md
            hover:shadow-xl
            transition-shadow
            duration-1000
            " 
            
            @click="addNumber">+</button>
    <!-- Room for other operations -->

    <button @click="subtractNumber">-</button>

    <br />

    <button 
    class = "p-2.5 
            space-x-4
            bg-gray-100
            hover:bg-green-100
            rounded-md
            hover:shadow-xl
            transition-shadow
            duration-1000
            " 
    @click="showResult">Show Result</button>
  </div>
</template>

<style>
.displayNumber {
  font-family: monospace;
}
</style>
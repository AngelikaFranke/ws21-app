<script>
const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default {
  data() {
    return {
      lastNumber: 0,
      currentNumberArray: [],
      numberKeys,
      operation:'',
      result: null
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

    addNumber(operation) {
      // Store the currentNumber in memory of the lastNumber
      this.lastNumber = this.currentNumber;
      this.currentNumberArray = [];

      if(operation === '+'){
        this.operation = '+'
      }
       else if(operation === '-'){
        this.operation = '-'
      }
        else if(operation === '*'){
        this.operation = '*'
      }
        else if(operation === '/'){
        this.operation = '/'
      }
    },

    showResult() {

      if(this.operation === '+') {
            this.result = this.lastNumber + this.currentNumber;
        } else if (this.operation === '-') {
            this.result = this.lastNumber - this.currentNumber;
        } else if (this.operation === '*') {
            this.result = this.lastNumber * this.currentNumber;
        } else if (this.operation === '/') {
            this.result = this.lastNumber / this.currentNumber;
        } else {
            this.result = 'error';
        }
      // if(this.operation === '+'){
      //   this.result = this.lastNumber + this.currentNumber;
      // } else if (this.operation === '-'){
      //   this.result = this.lastNumber - this.currentNumber;
      // } else {
      //   this.result = 'error';
      // }
    
      // let result = this.lastNumber + this.currentNumber;
      // if (this.operation === '-'){
      //   this.result = this.lastNumber - this.lastNumber
      //         this.currentNumberArray = [...String(this.result)];
      // }
      //this.currentNumberArray = [...String(this.result)];
      // Logic here has a lot of room for improvements
    },

    clearOutput() {
        this.lastNumber = null;
        this.currentNumberArray = [];
        this.result = null;
        this.operation = ''
    },

  },

};
</script>

<template>
<div>
<h1>Calculator Page</h1>
<div  class="containerBox  bg-blue-50 box-border h-100 w-100 p-4 border-4 m-5">
  <div class="py-5">
    <div class="row">
      <!-- <p>last stored number</p>
      <p class="displayNumber ">{{ lastNumber }}</p> -->

      <p class="text-red-900 my-2 px-5">Display Number</p>
      <p class="displayNumber flex  bg-red-100 text-2xl px-5 py-2">{{ lastNumber }} {{operation}} {{ currentNumber }}</p>
      <p class="text-red-900 my-2 px-5">Result</p>
      <strong class="display-result flex  text-red-900 text-2xl px-5 py-0">{{ result }} </strong>

    </div>
    <br>
    </div>

<div class="grid grid-cols-4 gap-4 mt-10" >
    <button class="bg-indigo-200 hover:bg-indigo-100"
      v-for="number in numberKeys"
      @click="pushNumber(number)"
      :key="number"
    >
      {{ number }}
    </button>

</div>

    <br />

<div class="grid grid-cols-5 gap-5">
    <button
      @click="addNumber('+')" class="bg-indigo-300 text-lg hover:bg-indigo-200">+</button>
    <!-- Room for other operations -->

    <button 
    @click="addNumber('-')"  class="bg-indigo-300 text-lg hover:bg-indigo-200">-</button>

    <button 
    @click="addNumber('*')"  class="bg-indigo-300 text-lg hover:bg-indigo-200">*</button>

    <button 
    @click="addNumber('/')"  class="bg-indigo-300 text-lg hover:bg-indigo-200">/</button>

    <button 
    class = "bg-indigo-300 text-lg hover:bg-indigo-200" 
    @click="clearOutput">C</button>

</div>

    <br />

    <button 
    class = "w-1/2 bg-indigo-300 text-xl hover:bg-indigo-200" 
    @click="showResult">=</button>

</div>

  </div>
</template>

<style>
.displayNumber {
  font-family: monospace;
}
.row {
  height: 80px;
  margin-bottom: -1px;
}

.containerBox {
  width: 400px;
	height: auto;
  
  margin: 1px auto;
  padding: 0;
  
  /* prevent selection of text inside keys */
  -webkit-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none;
}


</style>
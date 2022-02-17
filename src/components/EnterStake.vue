<template>
  <div class="enter-stake" v-if="chips > 0">
    Enter stake:
    <span v-for="num in [1, 2, 5, 10, 20, 50]">
      <button v-if="chips >= num" @click.prevent="$emit('next', num)">{{num}}</button>  
    </span>
  </div>
</template>

<script>
export default {
  props: {
    phase: Number,
    chips: Number
  }
};
</script>

<style>
.enter-stake {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

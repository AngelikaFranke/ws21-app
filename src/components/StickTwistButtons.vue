<template>
  <div class="buttons">
    <button :disabled="buttonsDisabled" @click.prevent="$emit('stick')" class="stick">Stick ✋</button>
    <button :disabled="buttonsDisabled" @click.prevent="$emit('twist')" class="twist">Twist 🤲</button>
  </div>
</template>

<script>
export default {
  props: {
    buttonsDisabled: Boolean
  }
};
</script>


<style scoped>
.stick {
  color: red;
}
.twist {
  color: green;
}
</style>

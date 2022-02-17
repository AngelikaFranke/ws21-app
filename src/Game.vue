<template>
  <div id="app">
    <main>
      <blackjack />
    </main>
  </div>
</template>

<script>
import Blackjack from './components/Blackjack.vue'
export default {
  name: 'app',
  components: {
    'blackjack': Blackjack
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

button {
  font-size: 50px;
  margin: 10px;
}

.swal-text {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

@media (max-width: 400px) {
  .card {
    font-size: 80px;
    line-height: 1;
  }
  .cards-section {
    display: flex;
    flex-direction: column;
  }
  .cards-and-count {
    display: flex;
    flex-direction: column;
    min-width: 130px;
  }
  button {
    font-size: 30px;
    padding: 20px;
    margin: 10px;
  }
  .buttons {
    display: flex;
    flex-direction: column;
  }
  .enter-stake {
    flex-wrap: wrap;
  }
}
</style>

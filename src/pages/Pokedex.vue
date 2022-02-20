<script>
// const POKEMON_API='https://pokeapi.co/api/v2/pokemon?limit=151';
// const POKEMON_IMAGE='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';

export default {
    // name: 'PokedexPage',
    data() {
        return {
            list: [],
        };
    },

  async mounted() {
      const localData = localStorage.getItem('pokemon')

      if(localData) {
          console.log('from storage')
          this.list = JSON.parse(localData)
      }

            const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
            // const result = await fetch(POKEMON_API);
            const data = await fetch(url);
            const pokemon = await data.json()

            localStorage.setItem('pokemon', JSON.stringify(pokemon.results));

            console.log('from fetch');
            this.list = pokemon.results;
            // this.pokemon = data.results;
    },

    methods: {

    }
};
</script>
<template>
    <h1>Pokedex Page</h1>

    <!-- <button @click="catchAll">Catch Pokemon</button> -->


<ul>

<div class = "grid grid-cols-12 gap-2 mt-10">   
    <li v-for="(item, index) in list" :key="index">
        <div class="text-center p-2">
        <div class ="flex
            bg-blue-50
            hover:bg-blue-100
            rounded-md
            hover:shadow-xl
            transition-shadow
            duration-1000">

        <img 
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1 
        }.png`" 
        alt="" secret="">
        </div>
        </div>
        <h2>{{ item.name }}</h2>
    </li>
</div>
</ul>

</template>

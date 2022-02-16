 <template>
 <div>
        <img 
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1 
        }.png`" 
        alt="" secret="">
        </div>
        <h2>{{ item.name }}</h2>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default {
    props: {
        imgString: 
    }
}
</script>

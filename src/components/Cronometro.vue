<template>
    <section>
        <strong class="display"> {{ tempoDecorrido }} </strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Cronometro',
    // Tudo que recebemos do elemento pai
    // São as propriedades que vamos receber nesse componente
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    // Monitora uma informação
    computed: {
        tempoDecorrido(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8)
        }
    }
})
</script>

<style scoped>
.display {
    color: var(--texto-primario)
}
</style>
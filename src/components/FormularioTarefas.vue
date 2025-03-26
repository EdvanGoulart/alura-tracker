<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulario de criação de nova tarefa">
                <!-- v-model : pega o que o usuário digitou e linka com o valor de descrição  -->
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column">
                <!-- recebendo tempoDecorrido(Lá esta como tempoEmSegundos-->
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Temporizador from './Temporizador.vue'


export default defineComponent({
    name: 'FormularioTarefas',
    // Eventos que podem ser utilizados ao declarar esse componente em outro arquivo
    $emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    data() {
        return {
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            // Passa os dados abaixo para quem estiver ouvindo esse evento
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ''
        }
    }
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>

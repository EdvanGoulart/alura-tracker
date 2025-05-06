<template>
    <div class="box">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulario de criação de nova tarefa">
                <!-- v-model : pega o que o usuário digitou e linka com o valor de descrição  -->
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <!-- recebendo tempoDecorrido(Lá esta como tempoEmSegundos-->
                <Temporizador @ao-temporizador-finalizado="salvarTarefa" />

            </div>
        </div>

    </div>

</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from 'vuex'
import { key } from '@/store'



export default defineComponent({
    name: 'FormularioTarefas',
    // Eventos que podem ser utilizados ao declarar esse componente em outro arquivo
    $emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    setup(props, { emit }) {
        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")
        const projetos = computed(() => store.state.projeto.projetos)

        const salvarTarefa = (tempoDecorrido: number): void => {
            // Passa os dados abaixo para quem estiver ouvindo esse evento
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                // this.projetos: é a lista de projetos (provavelmente vinda do Vuex ou de data()/computed).
                // .find(...): é um método do JavaScript que retorna o primeiro item que satisfaz a condição.
                // proj => proj.id == this.idProjeto: é a condição — ele está procurando o projeto com id igual a this.idProjeto.
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = ''
        }


        return {
            descricao,
            idProjeto,
            // PQ uso esse computed ? 
            // Você usa computed para criar propriedades reativas derivadas — ou seja, valores que dependem de outros valores reativos e se atualizam automaticamente quando esses valores mudam.
            // O computed() é como uma fórmula automática.
            // Ele observa as dependências reativas dentro dele (como store.state.projetos) e recalcula o valor toda vez que alguma dessas dependências muda.
            projetos,
            salvarTarefa
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

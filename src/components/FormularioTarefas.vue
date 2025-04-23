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
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />

            </div>
        </div>

    </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { NOTIFICAR } from '@/store/tipo-mutacoes'


export default defineComponent({
    name: 'FormularioTarefas',
    // Eventos que podem ser utilizados ao declarar esse componente em outro arquivo
    $emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find((p) => p.id == this.idProjeto);
            if (!projeto) { // se o projeto não existe...
                this.store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: "Selecione um projeto antes de finalizar a tarefa!",
                    tipo: TipoNotificacao.ERRO,
                }); // notificamos o usuário
                return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
            }
            // Passa os dados abaixo para quem estiver ouvindo esse evento
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                // this.projetos: é a lista de projetos (provavelmente vinda do Vuex ou de data()/computed).
                // .find(...): é um método do JavaScript que retorna o primeiro item que satisfaz a condição.
                // proj => proj.id == this.idProjeto: é a condição — ele está procurando o projeto com id igual a this.idProjeto.
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = ''
        }
    },
    setup() {
        const store = useStore(key)
        return {
            // PQ uso esse computed ? 
            // Você usa computed para criar propriedades reativas derivadas — ou seja, valores que dependem de outros valores reativos e se atualizam automaticamente quando esses valores mudam.
            // O computed() é como uma fórmula automática.
            // Ele observa as dependências reativas dentro dele (como store.state.projetos) e recalcula o valor toda vez que alguma dessas dependências muda.
            projetos: computed(() => store.state.projetos),
            store
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

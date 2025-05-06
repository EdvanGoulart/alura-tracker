<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes'
import { useRouter } from 'vue-router'
// import { notificacaoMixin } from '@/mixins/Notificar'

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    // Pesquisar sobre o Mixin, mas ele deu o exemplo
    // mixins: [notificacaoMixin],
    // Quando componente for montado
    // mounted() {
    //     if (this.id) {
    //         const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
    //         // Se ele tiver projeto ele atribui e se não adiciona vazio
    //         this.nomeDoProjeto = projeto?.nome || ''
    //     }
    // },
    // data() {
    //     return {
    //         nomeDoProjeto: "",
    //     }
    // },
    setup(props) {
        // Dentro do setup n temos acesso a this

        const router = useRouter()
        const store = useStore()
        const { notificar } = useNotificador()

        const nomeDoProjeto = ref("")

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            // Se ele tiver projeto ele atribui e se não adiciona vazio
            nomeDoProjeto.value = projeto?.nome || ''
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = '';
            notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto cadastrado com sucesso !')
            router.push('/projetos')
        }

        const salvar = () => {
            if (props.id) {
                //Usamos o commit para usar as nossas mutations
                // nomeDoProjeto.value -> o .value é pq é uma variável reativa
                store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value })
                    .then(() => lidarComSucesso())
            } else {
                //Retornando a promice
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso())
            }


        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
})
</script>

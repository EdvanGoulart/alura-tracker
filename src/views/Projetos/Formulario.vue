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
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import useNotificador from '@/hooks/notificador'
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
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            // Se ele tiver projeto ele atribui e se não adiciona vazio
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: "",
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, { id: this.id, nome: this.nomeDoProjeto })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }

            this.nomeDoProjeto = '';
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto cadastrado com sucesso !')
            this.$router.push('/projetos')
        }
    }, setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
})
</script>

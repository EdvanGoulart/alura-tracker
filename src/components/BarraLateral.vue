<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="logo">
        </h1>
        <div class="has-text-centered">
            <button class="button" @click="alterarTema">
                {{ textoBotao }}
            </button>
        </div>
        <nav class="panel mt-5">
            <ul>
                <!-- Vai para principal -->
                <li> <router-link to="/" class="link"><i class="fas fa-tasks"> Tarefas </i></router-link></li>
                <!-- Vai para projetos -->
                <li> <router-link to="/projetos" class="link"><i class="fas fa-project-diagram"> Projetos
                        </i></router-link></li>
            </ul>
        </nav>

    </header>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    data() {
        return {
            modoEscuroAtivo: false
        }
    },
    computed: {
        textoBotao() {
            if (this.modoEscuroAtivo) {
                return 'Desativar modo escuro'
            } else {
                return 'Ativar modo escuro'
            }
        }
    },
    methods: {
        alterarTema() {
            // passando para true (ativando o modo escuro)
            this.modoEscuroAtivo = !this.modoEscuroAtivo
            // Emitindo o evento e enviando o parâmetro modoEscuroAtivo
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
        }
    }
})

</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 8px 0;
}

.link {
    color: #fff;
}

.link:hover {
    color: #FAF0CA;
}

.link.router-link-active {
    color: #FAF0CA;
}
</style>
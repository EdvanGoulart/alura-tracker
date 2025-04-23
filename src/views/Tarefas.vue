<template>
    <!-- Ouvindo o evento aoSalvarTarefa -->
    <FormularioTarefas @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje !
        </Box>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Box from '../components/Box.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa'
import FormularioTarefas from '../components/FormularioTarefas.vue';



export default defineComponent({
    name: 'App',
    components: {
        FormularioTarefas,
        Tarefa,
        Box
    },
    data() {
        return {
            tarefas: [] as ITarefa[],
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa)
        },
    }
});
</script>

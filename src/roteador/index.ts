import Tarefas from "../views/Tarefas.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Projetos from "@/views/Projetos.vue";
import Formulario from '@/views/Projetos/Formulario.vue'
import Lista from '@/views/Projetos/Lista.vue'

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        // /projetos
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                // /projetos/novo
                path: 'novo',
                name: 'Novo Projeto',
                component: Formulario
            },
            {
                // /projetos/:id
                path: ':id',
                name: 'Editar Projeto',
                component: Formulario,
                //Para podermos receber o :id no componente Formulário
                props: true // Diz que o seguimento :id, vai pegar o nome que a gente definiu (:id) e vai injetar na nossa visualização como se fosse uma propriedade do componente

            }
        ]
    }

]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;



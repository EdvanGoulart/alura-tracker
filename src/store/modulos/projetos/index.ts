import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto) //Adicionando a lista de projetos no estado
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },

    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos').then(resposta => commit(DEFINIR_PROJETO, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            //retornando a promice de execução
            // O axios quando fazemos uma requisição ele retorna uma promice, vamos pegar essa promessa e retornar para quem fez dispach da action
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        }, [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            //retornando a promice de execução
            // O axios quando fazemos uma requisição ele retorna uma promice, vamos pegar essa promessa e retornar para quem fez dispach da action
            // Para atualizar usamos o put
            return http.put(`/projetos/${projeto.id}`, projeto)
        }, [REMOVER_PROJETO]({ commit }, id: string) {
            //retornando a promice de execução
            // O axios quando fazemos uma requisição ele retorna uma promice, vamos pegar essa promessa e retornar para quem fez dispach da action
            // Para excluir usamos o delete
            //usamos o then() para quando dar tudo certo, usarmos a nossa mutation de excluir o projeto na página para não precisarmos recarregar a página
            return http.delete(`/projetos/${id}`).then(() => commit(EXCLUIR_PROJETO, id))
        },

    }
}
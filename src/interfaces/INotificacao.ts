export enum TipoNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO,
  ERRO
}

export interface INotificacao {
    titulo: string
    texto: string
    tipo: TipoNotificacao
    id: number
}
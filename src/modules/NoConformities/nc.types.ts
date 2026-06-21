export type NoConformitiesCreate = {
    invoice: string;
    supplier_id: string;
    type_noConformity: TypeNoConformity;
    description?: string | undefined;
    expected_quantity: number;
    received_quantity: number;
    divergent_quantity?: number;
    status: StatusNoConformity;
    responsibleUser_id: string;
}
export type NoConformitieFull = NoConformitiesCreate & {
  id: number;
  opening_date: string;
  noConformityHistory?: Array<object>
  divergent_quantity: number;
}

export enum TypeNoConformity {
  FATURADO_A_MAIS,
  FATURADO_A_MENOS,
  DIFERENTE_DO_PEDIDO,
  AVARIADO,
  NAO_ENVIADO,
  OUTROS,
}
export enum StatusNoConformity {
  ABERTA,
  EM_ANALISE,
  AGUARDANDO_FORNECEDOR,
  AGUARDANDO_DEVOLUCAO,
  DEVOLVIDO,
  FINALIZADA,
  CANCELADA,
}
import { z } from "zod";
import { StatusNoConformity, TypeNoConformity } from './nc.types'

export const noConformitySchema = z.object({
    invoice: z.string(),        // Nota Fiscal
    supplier_id: z.string(),    // Fornecedor
    type_noConformity: z.nativeEnum(TypeNoConformity),                       // Tipos de não conformidades
    description: z.string().optional(),     // Descrição da não conformidade
    expected_quantity: z.coerce.number(),   // Quantidade esperada
    received_quantity: z.coerce.number(),   // Quantidade recebida
    status: z.nativeEnum(StatusNoConformity),
     responsibleUser_id: z.string()
})
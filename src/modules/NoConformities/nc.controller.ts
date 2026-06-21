import type { Request, Response, NextFunction } from 'express';
import type { NoConformitiesCreate, StatusNoConformity, TypeNoConformity } from './nc.types';
import { noConformitySchema } from './nc.schemas'
import NoConformitieServive from './nc.service';

/**
 * Function that receives {@link Request} in method 'POST', validates fiels/information in @param req.body and returns http status.
 * @param req - Request with body contend:
 * ```json
 * {
    "invoice": string,
    "supplier_id": string,
    "type_NoConformity": string["FATURADO_A_MAIS", "FATURADO_A_MENOS", "DIFERENTE_DO_PEDIDO", "AVARIADO", "NAO_ENVIADO", "OUTROS"],
    "description": string,
    "expected_quantity": number,
    "received_quantity": number,
    "status": string["ABERTA", "AGUARDANDO_FORNECEDOR", "AGUARDANDO_DEVOLUCAO", "CANCELADA", "DEVOLVIDO", "EM_ANALISE", "FINALIZDA"],
    "responsibleUser_id": string
 * }
 * ```
 */
export const createNC = async (req: Request, res: Response) => {
    const NcValidate = await noConformitySchema.safeParse(req.body);
    if (!NcValidate.success) {
        res.status(400).json({
            success: false,
            message: '❌ All the propries is necessary',
            error: NcValidate.error.format(),
            timestamp: new Date().toISOString()
        })
        throw new Error('Data invalida!')
    }

    
    const response = await NoConformitieServive.createNoConformite(NcValidate.data);

}
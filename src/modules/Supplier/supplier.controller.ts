import type { Request, Response } from 'express';

import { SupplierValidate } from './supplier.schema';
import { SupplierService } from './supplier.service';

const supplierService = new SupplierService()

/**
 * Controller responsável por lidar com a requisição HTTP de criação de um fornecedor.
 * Realiza  a validação dos dados de entrada e coordena a execução dos serviços de negócios.
 * @async
 * @function createSupplierController
 * @param {Request} req - Objecto de requisição do Express contendo o corpo(body) com os dados do fornecedor.
 * @param {Response} res - Objeto de resposta do Express para retornar o status e dados.
 * @returns {Promise<Response>} Retorna uma promessa com a resposta HTTP (JSON).
 */
export const createSupplie = async (req: Request, res: Response): Promise<Response> => {
    //1. Validação de dados com Zod.
    const supplierValidate = await SupplierValidate.safeParse(req.body);

    if (!supplierValidate.success) {
        // o 'return' é crucial para execução caso falte algum parâmetro!
        return res.status(400).json({
            success: false,
            message: "Todos os parametros são necessários",
            error: supplierValidate.error.format()  // .format() deixa o erro do Zod mais amigavel
        });
    }

    //2. Chamada do Service passando os dados validados
    const { response } = await supplierService.createService(supplierValidate.data);

    //3. Retorno da respota baseada no que o Repository/Service resolve/
    return res.status(response.statusCode).json(response);
}
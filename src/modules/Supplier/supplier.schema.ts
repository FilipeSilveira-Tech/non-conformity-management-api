import { z } from 'zod';

export const SupplierValidate = z.object({
    fantasy_name: 
        z.string()
        .min(1, 'O nome fantásia é obrigatorio'),

    cnpj: 
        z.string()
        .length(14, 'O CNPJ deve conter 14 digitos')
        .regex(/^\d+$/, 'O CNPJ deve contem apenas números'),

    phone_number: 
        z.string()
        .optional().default(''),
    
        cellPhone_number: 
        z.string()
        .optional()
        .default('')
})
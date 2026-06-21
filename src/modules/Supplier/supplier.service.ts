import { randomUUID } from "node:crypto";

import type { SupplierCreate, SupplierFull } from "./supplier.type";
import type { RepositorieResponse } from "../response.type";
import { SupplierRepository } from "./supplier.repository";
import { prisma } from "../../database/prisma";

const supplierRepository = new SupplierRepository(prisma);

export class SupplierService {
  /**
   * Regra de negócio para criação de um novo fornecedor
   * @async
   * @method createService
   * @param {SupplierCreate} data - Os dados brutos do fornecedor vindo do Controller
   * @returns {Promise<{ response: RepositorieResponse }>} Objeto contendo a resposta detalhada do repositório.
   */
  public async createService(
    data: SupplierCreate,
  ): Promise<{ response: RepositorieResponse }> {
    if (data.email == null) {
      data.email = [];
    }

    const response = await supplierRepository.createSupplier(data);
    return { response };
  }

  public async getService(
    cnpjFornecedor: string,
  ): Promise<{ response: RepositorieResponse }> {
    const response = await supplierRepository.getSupplier(cnpjFornecedor);
    return { response };
  }
}

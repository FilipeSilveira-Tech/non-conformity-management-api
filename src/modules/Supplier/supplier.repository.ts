import { PrismaClientKnownRequestError } from "../../database/generated/prisma/internal/prismaNamespace";

import type { SupplierCreate, SupplierFull } from "./supplier.type";
import type { RepositorieResponse } from "../response.type";
import { PrismaClient } from "../../database/generated/prisma/client";

const timeISO = new Date().toISOString();

export class SupplierRepository {
  private prisma: PrismaClient;
  constructor(prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  /**
   * Cria um novo fornecedor no banco de dados.
   * @async
   * @method createSupplier
   * @param {SupplierCreate} data_supplier - Os dados necessários para a criação do fornecedor
   * @returns {Promise<RepositorieResponse>} Uma promessa que resolve com a resposta do repositório, contendo o status, sucesso e mensagem/timestamp
   * @throws {PrismaClientKnownRequestError} Se houver um erro conhecido do Prisma (ex: violação de restrição única P2002 -> Retorna 409).
   * @throws {Erro} Para erros internos genéricos do servidor (Retorna 500)
   */
  public async createSupplier(
    data_supplier: SupplierCreate,
  ): Promise<RepositorieResponse> {
    try {
      const inicio = performance.now();
      await this.prisma.supplier.create({
        data: {
          id: data_supplier.id!,
          fantasy_name: data_supplier.fantasy_name,
          cnpj: data_supplier.cnpj,
          phone_number: data_supplier.phone_number || "",
          email: data_supplier.email || [],
        },
      });
      return {
        statusCode: 201,
        success: true,
        message: "Fornecedor criado com sucesso!",
        timestamp: timeISO,
        tempoExecucao: performance.now() - inicio,
      };
    } catch (erro) {
      console.error("❌ Erro ao criar o fornecedor:", erro);
      if (
        erro instanceof PrismaClientKnownRequestError &&
        erro.code === "P2002"
      ) {
        return {
          statusCode: 409,
          success: false,
          message: "CNPJ já cadastrado!",
          timestamp: timeISO,
        };
      }
      return { statusCode: 500, success: false, timestamp: timeISO };
    }
  }

  public async getSupplier(
    cnpjFornecedor: string,
  ): Promise<RepositorieResponse> {
    try {
      const inicio = performance.now();
      const supplier = await this.prisma.supplier.findUnique({
        where: { cnpj: cnpjFornecedor },
      });

      if (supplier == null) {
        return {
          statusCode: 404,
          success: false,
          message: "Fornecedor não encontrado!",
          timestamp: timeISO,
          tempoExecucao: performance.now() - inicio,
        };
      }
      return {
        statusCode: 200,
        success: true,
        timestamp: timeISO,
        tempoExecucao: performance.now() - inicio,
        data: { supplier },
      };
    } catch (erro) {
      console.error("❌ Erro interno", erro);
      return {
        statusCode: 500,
        success: false,
        message: "Erro interno",
        timestamp: timeISO,
      };
    }
  }

  public async getAllSuppliers(): Promise<RepositorieResponse> {
    try {
      const inicio = performance.now();
      const suppliers = await this.prisma.supplier.findMany();

      if (suppliers == null) {
        return {
          statusCode: 200,
          success: true,
          timestamp: timeISO,
          tempoExecucao: performance.now() - inicio,
          data: { suppliers },
        };
      }

      return {
        statusCode: 200,
        success: true,
        timestamp: timeISO,
        tempoExecucao: performance.now() - inicio,
        data: { suppliers },
      };
    } catch (erro) {
      console.error("❌ Erro interno", erro);
      return {
        statusCode: 500,
        success: false,
        message: "Erro interno",
        timestamp: timeISO,
      };
    }
  }
}

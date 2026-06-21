import { PrismaClientKnownRequestError } from '../../database/generated/prisma/internal/prismaNamespace';
import { PrismaClient } from '../../database/generated/prisma/client';

import type { FullUser, UserCreated } from './user.types';
import type { RepositorieResponse } from '../response.type';
const timeISO = new Date().toISOString();

export class UserRepository {
    private prisma: PrismaClient
    constructor(prismaInstance: PrismaClient) {
        this.prisma = prismaInstance
    }

    /**
     * Cria um novo usuário no banco de dados
     * @async
     * @method createUser
     * @param {UserRepository} userInfo - Os dados necessários para criação do usuário.
     * @return {Promise<RepositorieResponse>} - Uma promessa que resolve com a resposta do respotirório, contendo o status, sucess e mensagem/timestamp
     * @throws {PrismaClientKnownRequestError} - Se houver um erro conhecido do Prisma (ex.: usuário já existente -> Retorna 409).
     * @throws {Error} - Para erros internos genéricos do servidor (Retorna 500)
     */
    public async createUser(userInfo: UserCreated): Promise<RepositorieResponse> {
        try {
            await this.prisma.user.create({
                data: {
                        name: userInfo.name,
                        username: userInfo.username,
                        email: userInfo.email,
                        password: userInfo.password,
                    }
            })
            return { statusCode: 201, success: true, message: 'Usuário criado!', timestamp: timeISO }
        } catch(erro) {
            console.error('❌ Error na criação do usuário');
            if (erro instanceof PrismaClientKnownRequestError && erro.code === 'P2002') {
                return { statusCode: 409, success: false, message: 'Username ou email já existente', timestamp: timeISO }
            }
            return { statusCode: 500, success: false, timestamp: timeISO }
        }
    }

    /**
     * Função para encontrar um usuário no banco de dados
     * @async
     * @method getUser
     * @param {string} username - O username do usuário a ser buscado
     * @returns {Promise<RepositorieResponse>} Uma promessa que resolve com a resposta do repositório, contendo o status, sucesso e mensagem/timestamp
     * @throws {Erro} - Para erros internos genèricos do servidor (Retorna 500)
     */
    async getUser(username: string): Promise<RepositorieResponse> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username: username },
                select: { id: true, username: true, noConformitys: true}
            });
            
            if (user == null) {
                return { statusCode: 404, success: false, message: 'Usuário não encontrado', timestamp: timeISO }
            }
            return { statusCode: 200, success: true, timestamp: timeISO, data: { user } }
        } catch(erro) {
            console.error('❌ Error interno', erro)
            return { statusCode: 500, success: false, message: 'Erro interno', timestamp: timeISO }
        }
    }
}

import 'dotenv/config';
import bcrypt from 'bcrypt';

import type { RepositorieResponse } from '../response.type';
import type { UserCreated, FullUser } from './user.types';

const { HASH_SALT } = process.env;
import { prisma } from '../../database/prisma'
import { UserRepository } from './user.respository';
const userRepository = new UserRepository(prisma);

export class UserService {
    /**
     * Regra de negócio para criação de um novo usuário
     * @async
     * @method createUser
     * @param {UserCreated} data - Os dados brutos do usuario vindo do Controller
     * @return {Promise<{ response: RepositorieResponse }>} Objeto contendo a resposta detalhada do respositório.
     */
    async createUser(data: UserCreated): Promise<{ response: RepositorieResponse }> {
        const encryptingPassword = async (decrypted: string, saltNumber: string, ) => { // Criptação da senha
            const hash = await bcrypt.hash(decrypted, Number(saltNumber));
            return hash;
        }
        const user = { // Mutabilidade do objeto do user
            ...data,
            password: await encryptingPassword(data.password, HASH_SALT)
        }
        const response = await userRepository.createUser(user);
        return { response }
    }

    /**
     * Regra de negócio para busca de um usuário
     * @async
     * @method createUser
     * @param {string} username - O username bruto vindo do Controller
     * @return {Promise<{ response: RepositorieResponse }>} Objeto contendo a resposta detalhada do respositório.
     */
    async seachUser(username: string): Promise<{ response: RepositorieResponse }> {
        const response = await userRepository.getUser(username)
        return { response }
    }
}

export default new UserService();
export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            HASH_SALT: string;
        }
    }
}
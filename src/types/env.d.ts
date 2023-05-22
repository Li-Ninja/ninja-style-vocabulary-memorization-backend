declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_NAME: string;
    MONGODB_ACCOUNT: string;
    MONGODB_PASSWORD: string;
    SALT_ROUNDS: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    CORS_ORIGIN: string;
  }
}

const env = Deno.env.toObject();
export const APP_HOST = env.APP_HOST || '127.0.0.1';
export const APP_PORT = env.APP_PORT || 7777;
export const DB_PATH = env.DB_PATH || 'mongodb://localhost:27017';
export const DB = env.DB || 'todo';
export const DB_TODOS = env.DB_TODOS || 'todos';
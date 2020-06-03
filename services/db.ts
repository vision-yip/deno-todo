import { MongoClient } from 'https://deno.land/x/mongo/mod.ts';
import { DB_PATH, DB, DB_TODOS } from '../config.ts';

const client = new MongoClient();
client.connectWithUri(DB_PATH);

export const db = client.database(DB);
export const todos = db.collection(DB_TODOS);
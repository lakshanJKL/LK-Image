import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql2 from 'mysql2';
import * as schema from './schema';

const pool = mysql2.createPool({
    uri:process.env.DATABASE_URL,
})

const db = drizzle(pool, {
    schema,
    mode: 'default'
}
);

export default db;
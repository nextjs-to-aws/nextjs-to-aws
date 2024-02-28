import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { env } from "@/env.mjs";

// export const connection = postgres(env.DATABASE_URL);

// export const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   multipleStatements: true,
// });
// export const db = drizzle(connection, { schema });

export const db = drizzle(postgres(env.DATABASE_URL), { schema });

// import { Pool } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';
//
// const client = new Pool({connectionString: process.env.DATABASE_URL!})
// export const db = drizzle(client);

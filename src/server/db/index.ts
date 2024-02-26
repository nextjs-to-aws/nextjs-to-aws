import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { env } from "@/env.mjs";

export const db = drizzle(postgres(env.DATABASE_URL), { schema });

// import { Pool } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';
//
// const client = new Pool({connectionString: process.env.DATABASE_URL!})
// export const db = drizzle(client);

import {Kysely, PostgresDialect} from "kysely";
import {Pool} from "pg";

import {Database} from "./types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DATABASE!,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

export const db = new Kysely<Database>({dialect});

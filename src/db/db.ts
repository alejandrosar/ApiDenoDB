import { Database } from 'https://deno.land/x/denodb/mod.ts';

import User from '../models/user.ts';




const db = new Database(
  {
    dialect: 'mysql',
  },
  {
    host: '127.0.0.1',
    username: 'exampleuser',
    password: 'Qwerty?2021',
    database: 'dbusers',
  }
);

db.link([User]);

export default db;
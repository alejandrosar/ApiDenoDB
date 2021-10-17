import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routing/routes.ts';
import db from './db/db.ts';

const app = new Application();
const port = 3050;

//usar midelware para enrutado
app.use(router.routes());

db.sync();

await app.listen({port:port});
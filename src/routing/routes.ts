import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { getOne, getAll, post, put, remove } from '../controllers/usersController/usersController.ts';




const router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = "Bienvenido! =D";
    ctx.response.status = 200;
});

router.get('/users/:id', getOne);
router.get('/users', getAll);
router.post('/users', post);
router.put('/users/:id', put);
router.delete('/users/:id',remove);





export default router;
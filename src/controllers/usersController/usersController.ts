import { helpers, RouterContext } from "https://deno.land/x/oak/mod.ts";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUseer
} from "../../repositories/usersRepository/usersRepository.ts";

const getOne = async (ctx: RouterContext) => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const result = await getOneUser(id);
  
    ctx.response.body = result.returnModel;
    ctx.response.status = result.statusResponse;
  };

const getAll = async (ctx: RouterContext) => {

  const result = await getAllUsers();
  ctx.response.body = result.returnModel;
  ctx.response.status = result.statusResponse;
  return ctx;
};


const post = async (ctx: RouterContext) => {
  const body = await ctx.request.body().value;

  const result = await createUser(body);
  if (result) {
    ctx.response.body = result;
    ctx.response.status = 200;
  } else {
    ctx.response.body = { "message": "500 | internal server error" };
    ctx.response.status = 500;
  }
};

const put = async (ctx: RouterContext) => {

  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const body = await ctx.request.body().value;
  if (id == body.id) {
    const result = await updateOneUser(id, body);
    if (result) {
      ctx.response.body = result;
      ctx.response.status = 200;
    } else {
      ctx.response.body = { "message": "404 | not found" };
      ctx.response.status = 404;
    }
  } else {
    ctx.response.body = "Los ids no coinciden";
    ctx.response.status = 422;
  }
};

const remove = async (ctx:RouterContext) =>{
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const result = await deleteOneUseer(id);
    if(result.status){
        ctx.response.body = {'message':result.message};
        ctx.response.status = result.statusResponse;
    }else{
        ctx.response.body = result.message;
        ctx.response.status = result.statusResponse;
    }
}

export { getAll, getOne, post, put, remove};

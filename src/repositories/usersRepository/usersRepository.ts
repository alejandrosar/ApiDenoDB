import User from "../../models/user.ts";
import {
  fillRepositoryResponse,
  repositoryResponse,
} from "../../models/repositoryResponse.ts";

const getAllUsers = async () => {
  let toReturn: repositoryResponse = {
    "status": false,  "statusResponse": 0,
    "returnModel": null,  "message": "",
  };
  try {
    const result = await User.all();
    if (result && result.length > 0) {
      fillRepositoryResponse(toReturn, true, 200, result, "");
    } else {
      fillRepositoryResponse(toReturn, true, 404, {"message":"404 | not found"}, "404 | not found");
    }
  } catch (error) {
    fillRepositoryResponse(toReturn, false,500,{"message":"500 | internal server error"},"500 | internal server error");
  } finally {
    return toReturn;
  }
};

const getOneUser = async (id: number | string) => {
    let toReturn: repositoryResponse = {
        "status": false,  "statusResponse": 0,
        "returnModel": null,  "message": "",
    };
    try {
        const result = await User.where("id", id).first();    
        if(result){
            fillRepositoryResponse(toReturn,true,200,result,"");
        }else{
            fillRepositoryResponse(toReturn,true,404,{"message":"404 | not found"},"");
        }
    } catch (error) {
        fillRepositoryResponse(toReturn,true,500,{"message":error},error);
    }finally{
        return toReturn;
    }
  

  
};
const createUser = async (body: any) => {
  const result = await User.create(body);
  console.log("ADDED", result);
  const toReturn = await getOneUser(await User.count());
  console.log("RESULTADO", toReturn);

  return toReturn;
};

const updateOneUser = async (id: string | number, body: any) => {
  const exists = await getOneUser(id);

  

  if (exists.statusResponse === 200) {
    exists.returnModel.name = body.name;
    exists.returnModel.country = body.country;

    await exists.returnModel.update();

    return exists;
  } else {
    return null;
  }
};

const deleteOneUseer = async (id: string | number) => {
  let toReturn: repositoryResponse = {
    "status": false,
    "statusResponse": 0,
    "returnModel": false,
    "message": "",
  };
  try {
    const exist = await getOneUser(id);
    if (exist.statusResponse === 200 && exist.returnModel.id == id) {
      await exist.returnModel.delete();
      fillRepositoryResponse(
        toReturn,
        true,
        200,
        true,
        `Usuario con id ${id} elimindao`,
      );
    } else {
      fillRepositoryResponse(
        toReturn,
        false,
        404,
        false,
        `404 | Usuario con id ${id} no encontrado`,
      );
    }
  } catch (error) {
    fillRepositoryResponse(toReturn, false, 500, {"message":"500 | internal server error"}, error);
  } finally {
    return toReturn;
  }
};

export { createUser, deleteOneUseer, getAllUsers, getOneUser, updateOneUser };

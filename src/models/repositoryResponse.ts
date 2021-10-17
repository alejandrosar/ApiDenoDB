export interface repositoryResponse {
    status:boolean;
    statusResponse:number;
    returnModel: any;
    message: string;

    

}

const fillRepositoryResponse = (r: repositoryResponse, status:boolean, statusResponse:number,returnModel:any, message:string) => {
    r.status = status;
    r.statusResponse = statusResponse;
    r.returnModel = returnModel;
    r.message = message;
}

export {
    fillRepositoryResponse
}
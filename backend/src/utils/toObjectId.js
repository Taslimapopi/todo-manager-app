import { Types } from "mongoose"
import { ApiError } from "./apiError"
import { http_status } from "../shared/constant"

export const toObjectId = (id , label = 'ID')=>{
    if(!Types.ObjectId.isValid(id)){
        throw new ApiError(http_status.bad_request,`invalid ${label} : ${id}`)
    }

    return new Types.ObjectId(id)
}
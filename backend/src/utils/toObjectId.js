import { Types } from "mongoose"
import { ApiError } from "./apiError.js"
import { http_status } from "../shared/constant.js"

export const toObjectId = (id , label = 'ID')=>{
    if(!Types.ObjectId.isValid(id)){
        throw new ApiError(http_status.bad_request,`invalid ${label} : ${id}`)
    }

    return new Types.ObjectId(id)
}
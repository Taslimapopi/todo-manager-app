// import { Todo } from "../models/todoModel.js"

import { http_status } from "../../../shared/constant.js";
import { ApiError } from "../../../utils/apiError.js";
import { toObjectId } from "../../../utils/toObjectId.js";
import { toPlainObject } from "../../../utils/toPlainObject.js";
import { title_collation, Todo } from "../models/todoModel.js";

// export const createTodoRepository = ()=>{
//     return {
//         create : async todoData =>{
//             try{
//                 const todo =await Todo.create(todoData)

//                 return {
//                     todo
//                 }

//             }
//             catch(error){
//                 console.error('Repository error:', error.message);
//   throw error;
//             }
//         }
//     }
// }

const default_sort = {createdAt : -1}

export class TodoRepository {
    constructor(model = Todo){

        this.model = model

    }
    async create (todoData) {
        try{
         return   await this.model.create(todoData)
        }catch(error){
            if(error.code ===11000){
                throw new Error('duplicate title')
            }
        }
    }

    async insertMany(todos){
        return await this.model.insertMany(todos, {ordered  :false, collation: title_collation})
    }

    async findWithPagination (query, {page, limit, sort = default_sort},search){
        if (page <1 || limit < 1){ throw new ApiError(http_status.bad_request,`invalid pagination params page=${page} limit=${limit}`)}

        skip = (page-1)*limit

        if(search){
            const matchQuery = {...query}
            if(matchQuery.user){
                matchQuery.user = toObjectId(matchQuery.user,'User Id')
            }
        }

        const [todos,total] = await Promise.all([(await this.model.find(query)).toSorted(sort).skip(skip).limit(limit).lean(), this.model.countDocuments(query)])

         return {todos : todos.map(toPlainObject),total}
    }

   
}
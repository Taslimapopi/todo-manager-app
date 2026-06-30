// import { createTodoRepository } from "../repositories/todoRepository.js"

import { http_status } from "../../../shared/constant.js";
import { ApiError } from "../../../utils/apiError.js";
import { TodoRepository } from "../repositories/todoRepository.js";

// export const createTodoService = (todoRepository = createTodoRepository())=>{
//     return{
//         create : async todoData =>{
//             try{
//                 return await todoRepository.create(todoData)

//             }
//             catch(error){
//                 console.error(error)
//             }
//         }
//     }
// }

export class TodoService {
    constructor(repository = new TodoRepository()){
        this.repository = repository

    }
    async create(todoData){
        try{
            await this.repository.create({...todoData}) 
        }catch(error){
            if(error.message==='duplicate title'){
                throw new ApiError(http_status.conflict, 'title already existed')
            }
            throw error
        }
    }
}
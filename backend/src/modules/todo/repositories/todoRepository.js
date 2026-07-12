// import { Todo } from "../models/todoModel.js"

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
}
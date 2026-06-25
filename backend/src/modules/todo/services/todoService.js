import { createTodoRepository } from "../repositories/todoRepository"

export const todoService = (todoRepository = createTodoRepository())=>{
    return{
        create : (todoData) =>{
            try{

            }
            catch(error){
                console.error()
            }
        }
    }
}
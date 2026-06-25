import { Todo } from "../models/todoModel"

export const createTodoRepository = ()=>{
    return {
        create : async todoData =>{
            try{
                const todo =await Todo.create()

            }
            catch(error){
                console.error()
            }
        }
    }
}
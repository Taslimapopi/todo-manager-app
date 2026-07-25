// import { createTodoRepository } from "../repositories/todoRepository.js"

import { http_status, pagination } from "../../../shared/constant.js";
import { todo_status } from "../../../shared/enums.js";
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
  constructor(repository = new TodoRepository()) {
    this.todoRepository = repository;
  }

  static #buildQueryFilter({ status, priority, overdue }, userId) {
    const query = { user: userId };
    if (overdue) {
      query.status = todo_status.active;
      query.dueDate = { $lt: new Date(new Date().setHours(0, 0, 0, 0)) };
    } else if (status) {
      query.status = status;
    }

    if (priority) query.priority = priority;
    return query;
  }

  async create(todoData, userId) {
    try {
      return await this.todoRepository.create({ ...todoData, user: userId });
    } catch (error) {
      if (error.message === "duplicate title") {
        throw new ApiError(http_status.conflict, "title already existed");
      }
      throw error;
    }
  }
  async createBulk(todosArray, userId) {
    const todoWithUser = (todosArray || []).map((todo) => ({
      ...todo,
      user: userId,
    }));
    try {
      const created = await this.todoRepository.insertMany(todoWithUser);
      return { count: created.length, todos: created };
    } catch (error) {
      if (error.code === 11000 || error.name === "MongoBulkWriteError") {
        const inserted = error.insertedDocs ?? [];
        const failedCount = todosArray.length - inserted.length;
        return {
          count: inserted.length,
          todo: inserted,
          warnings:
            failedCount > 0 ? `${failedCount} todos were skipped` : undefined,
        };
      }
    }
  }

  async getAll(filters, userId) {
    const {
      page = pagination.default_page,
      limit = pagination.default_limit,
      search,
      ...filterQuery
    } = filters;

    const filtersQuery = TodoService.#buildQueryFilter(filterQuery, userId);
    const { todos, total } = await this.todoRepository.findWithPagination(
      filtersQuery,
      { page, limit },
      search,
    );
    return {
      todos,
      pagination: {
        total,
        currentPage: page,
      },
    };
  }

  async getById(id, userId) {
    const todo = await this.todoRepository.findOneByIdAndUser(id, userId);
    if (!todo) {
      throw new ApiError(http_status.not_found, "Todo not found");
    }

    return todo;
  }
}

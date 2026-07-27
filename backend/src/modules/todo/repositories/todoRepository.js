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

const default_sort = { createdAt: -1 };

export class TodoRepository {
  constructor(model = Todo) {
    this.model = model;
  }
  
async create(todoData) {
    try {
        return await this.model.create(todoData);
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("duplicate title");
        }
        throw error;   
    }
}

#ownerFilter(id, userId) {

  return {
    _id : toObjectId(id, 'Todo Id'),
    user : toObjectId(userId, 'user Id')
  }

}

  async insertMany(todos) {
    return await this.model.insertMany(todos, {
      ordered: false,
      collation: title_collation,
    });
  }

  async findWithPagination(
    query,
    { page, limit, sort = default_sort },
    search,
  ) {
    if (page < 1 || limit < 1) {
      throw new ApiError(
        http_status.bad_request,
        `invalid pagination params page=${page} limit=${limit}`,
      );
    }

    const skip = (page - 1) * limit;

    if (search) {
      const matchQuery = { ...query };
      if (matchQuery.user) {
        matchQuery.user = toObjectId(matchQuery.user, "User Id");
      }

      const searchStage = {
        $search: {
          index: "todo-autocomplete",
          compound: {
            should: [
              {
                autocomplete: {
                  query: search,
                  path: "title",
                  fuzzy: { maxEdits: 1 },
                },
              },
              {
                autocomplete: {
                  query: search,
                  path: "description",
                  fuzzy: { maxEdits: 1 },
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        },
      };
      const pipeline = [
        searchStage,
        {
          $match : matchQuery
        },
        ...(sort ? [{$sort : sort}] : []),
        {$skip:skip},
        {$limit : limit}
      ]
      const countPipeline = [
        searchStage,
        {$match: matchQuery},
        {$count : 'total'}
      ]
        const [todos, countResult] = await Promise.all([
            this.model.aggregate(pipeline),
            this.model.aggregate(countPipeline),
        ]);

        const total = countResult[0]?.total || 0;
        return { todos: todos.map(toPlainObject), total };
    }

    const [todos, total] = await Promise.all([
      ( this.model.find(query))
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      this.model.countDocuments(query),
    ]);

    return { todos: todos.map(toPlainObject), total };
  }

  async findOneByIdAndUser (id, userId) {
    const todo = await this.model.findOne(this.#ownerFilter(id, userId)).lean()
    return toPlainObject(todo)
  }

  async updateOneByIdAndUser(id, updateData, userId){
    const todo = await this.model.findOneAndUpdate(this.#ownerFilter(id, userId),
  {$set: updateData},{
    returnDocument: 'after',
    runValidators: true
  }).lean()
  return toPlainObject(todo)
  }

  async deleteOneByIdAndUser (id, userId){
    const todo = await this.model.findOneAndDelete(this.#ownerFilter(id,userId))
    return toPlainObject(todo)
  }

  async deleteManyUser (userId) {
    const todos = await this.model.deleteMany({user : toObjectId(userId, 'user Id')})

    return {
      deletedCount : todos.deletedCount
    }
  }

  


}

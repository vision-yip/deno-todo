import { todos } from './db.ts';
import { Todo } from '../models/todo.ts';
import { createId } from '../services/util.ts';

type TodoData = Pick<Todo, 'userId' | 'title' | 'completed'>;

// 获取列表
export const getTodos = async (): Promise<Todo[]> => {
  const t_l = await todos.find({ _id: { $ne: null } })
  if (t_l) {
    return t_l;
  } else {
    throw new Error('Fine todos fail for DB');
  }
};

// 获取详情
export const getTodo = async (todoId: string): Promise<Todo | undefined> => {
  const todo = await todos.findOne({ id: todoId })
  if (todo) {
    return todo;
  } else {
    throw new Error('Fine todo fail for DB');
  }
};

// 新建
export const createTodo = async (todoData: TodoData): Promise<string | number> => {
  const newTodo: Todo = {
    ...todoData,
    id: createId()
  };
  const _id = await todos.insertOne(newTodo);
  if (_id) {
    return newTodo.id;
  } else {
    throw new Error('insert fail for DB');
  }
};

// 更新
export const updateTodo = async (todoId: string, todoData: TodoData): Promise<void> => {
  const {  modifiedCount } = await todos.updateOne(
    { id: todoId },
    { $set: {
      title: todoData.title,
      completed: todoData.completed
    } }
  )
  if (!modifiedCount) throw new Error('Update fail, not found');
};

// 删除
export const deleteTodo = async (todoId: string): Promise<void> => {
  const deleteCount = await todos.deleteOne({ id: todoId })
  if (!deleteCount) throw new Error(`delete todo(${todoId}) fail`);
};
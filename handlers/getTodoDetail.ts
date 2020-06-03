import { Response, RouteParams } from 'https://deno.land/x/oak/mod.ts';
import { getTodo } from '../services/todos.ts';

export default async ({
  params,
  response
}: {
  params: RouteParams;
  response: Response;
}) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = { msg: '无效的id' };
    return;
  }
  const foundedTodo = await getTodo(todoId)
  if (!foundedTodo) {
    response.status = 404;
    response.body = { msg: `${todoId}找不到相应对象` };
    return;
  }

  response.body = foundedTodo
}
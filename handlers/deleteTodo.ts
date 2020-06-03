import { Response, RouteParams } from 'https://deno.land/x/oak/mod.ts';
import { deleteTodo, getTodo } from '../services/todos.ts';

export default async ({ params, response }: {
  params: RouteParams;
  response: Response
}) => {
  const todoId = params.id;
  if (!todoId) {
    response.status = 400;
    response.body = {msg: '无效的id'};
    return;
  }

  const foundTodo = await getTodo(todoId);
  if (!foundTodo) {
    response.status = 404;
    response.body = `id: ${todoId} 找不到相应内容`;
    return;
  }

  await deleteTodo(todoId);
  response.body = { msg: '操作成功' };
}
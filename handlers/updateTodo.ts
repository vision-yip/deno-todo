import { Response, Request } from 'https://deno.land/x/oak/mod.ts';
import { updateTodo } from '../services/todos.ts';

export default async ({ params, request, response }: {
  params: any;
  request: Request;
  response: Response;
}) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = { msg: '无效的id' };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: '内容不符合规则' };
    return;
  }

  const {
    value: {userId, title, completed}
  } = await request.body();

  await updateTodo(todoId, {userId, title, completed})
  response.body = {msg: '更新成功'}
}

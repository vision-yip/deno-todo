import { Request, Response } from 'https://deno.land/x/oak/mod.ts';
import { createTodo } from '../services/todos.ts';

export default async ({ request, response }: {
  request: Request;
  response: Response;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: '内容不符合规则' };
    return;
  }

  const {
    value: {userId, title, completed = false}
  } = await request.body();

  if (!userId || !title) {
    response.status = 422;
    response.body = {msg: '缺少用户id或者标题'};
    return;
  }

  const todoId = await createTodo({userId, title, completed});

  response.body = {msg: '操作成功', todoId};
}
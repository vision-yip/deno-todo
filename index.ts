import { Application, send } from 'https://deno.land/x/oak/mod.ts';
import { APP_HOST, APP_PORT } from './config.ts';
import router from './routing.ts';
import notFound from './handlers/notFound.ts';
import errorMiddleware from './middlewares/error.ts';

const app = new Application();

// 必须在中间件之前定义静态文件路径, 否则会进入notFound
app.use(async context => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: 'index.html'
  });
});

app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(`listening on ${APP_PORT}`);

await app.listen(`${APP_HOST}:${APP_PORT}`);
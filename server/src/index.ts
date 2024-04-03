import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
};

const app = new Hono<{ Bindings: Bindings}>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

// Todo一覧取得API
app.get('/api/todos', async (c) => {
  try {
    let { results } = await c.env.DB.prepare('SELECT * FROM todos').all();
    return c.json(results)
  } catch (e) {
    console.log(e)
    return c.json({err: e}, 500)
  }
});

// Todo投稿API
app.post('/api/todos', async (c) => {
  try {
    const { task } = await c.req.json(); // Promiseが解決されるまで値を取得できないので'await'で解決されるまで待つ必要がある。

    await c.env.DB.prepare('INSERT INTO todos (task) VALUE (?)')
    .bind(task)
    .run();

    return c.text('タスクが投稿されました')
  } catch (e) {
    console.log(e)
    return c.json({err: e}, 500);
  };
});

export default app;

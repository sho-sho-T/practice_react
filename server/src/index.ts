import { Hono } from 'hono'

export interface Bindings  {
  DB: D1Database;
}
const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

// Todo取得API
app.get('/api/todos', async c => {
  if (!!c.env) {
    const results = await (c.env.DB as D1Database).prepare('select * from todos').all();
    const todos = results.results;
    return c.json(todos);
  }
});

export default app;

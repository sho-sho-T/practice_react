import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
};

const app = new Hono<{ Bindings: Bindings}>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

// Todo取得API
app.get('/api/todos', async (c) => {
  try {
    let { results } = await c.env.DB.prepare('select * from todos').all();
    return c.json(results)
  } catch (e) {
    return c.json({err: e}, 500)
  }
});

export default app;

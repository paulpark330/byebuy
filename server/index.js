require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');
const jsonMiddleware = express.json();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.use(errorMiddleware);

app.post('/api/new-post', uploadsMiddleware, (req, res, next) => {
  const { userId, title, category, price, description, location } = req.body;
  if (!title || !category) {
    throw new ClientError(
      400,
      'title (string), category (string), and price (number) are required fields'
    );
  }
  let url = null;
  if (req.file) {
    url = `/images/${req.file.filename}`;
  }
  const sql = `
    with "insertedPost" as (
      insert into "posts" ("userId", "title", "category", "price", "description", "location")
        values ($1, $2, $3, $4, $5, $6)
      returning *
    )
    insert into "pictures" ("postId", "url")
      values ((select "postId" from "insertedPost"), $7)
    returning *
  `;
  const params = [userId, title, category, price, description, location, url];
  db.query(sql, params)
    .then(result => {
      const [newPost] = result.rows;
      res.status(201).json(newPost);
    })
    .catch(err => next(err));
});

app.get('/api/home', (req, res, next) => {
  const sql = `
  select *
    from "posts"
    join "pictures" using ("postId")
    order by "postId" desc
  `;
  db.query(sql)
    .then(result => {
      const allPosts = result.rows;
      res.status(201).json(allPosts);
    })
    .catch(err => next(err));
});

app.get('/api/search', (req, res, next) => {
  const search = req.query.input;
  const sql = `
  select *
    from "posts"
    join "pictures" using ("postId")
    where "title" || ' ' || "description" ILIKE $1
    order by "postId" desc
  `;
  const params = [`%${search}%`];
  db.query(sql, params)
    .then(result => {
      const allPosts = result.rows;
      res.status(201).json(allPosts);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

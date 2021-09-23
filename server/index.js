require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');
const argon2 = require('argon2');
const jsonMiddleware = express.json();
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(jsonMiddleware);

app.use(staticMiddleware);

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
    url = req.file.location;
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

app.post('/api/auth/sign-up', uploadsMiddleware, (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(
      400,
      'username (string) and password (string) are required fields'
    );
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("nickname", "hashedPassword")
      values ($1, $2)
      on conflict ("nickname")
      do nothing
      returning "userId", "nickname"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(400, 'username already exist');
      }
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', uploadsMiddleware, (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "nickname",
           "hashedPassword",
           "userId"
      from "users"
     where "nickname" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { nickname, userId, hashedPassword } = user;
      return argon2.verify(hashedPassword, password).then(isMatching => {
        if (!isMatching) {
          throw new ClientError(401, 'invalid login');
        }
        const payload = { userId, nickname };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        res.json({ token, user: payload });
      });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

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
      res.status(200).json(allPosts);
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
      res.status(200).json(allPosts);
    })
    .catch(err => next(err));
});

app.get('/api/post/:postId', (req, res, next) => {
  const postId = parseInt(req.params.postId, 10);
  if (!Number.isInteger(postId) || postId < 1) {
    throw new ClientError(
      400,
      'postId must be a positive integer'
    );
  }
  const sql = `
  select "userId", "postId", "title", "category", "price", "description", "location",
         "pictureId", "url", "nickname"
    from "posts"
    join "pictures" using ("postId")
    join "users" using ("userId")
    where "postId" = $1
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      const [post] = result.rows;
      res.status(200).json(post);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

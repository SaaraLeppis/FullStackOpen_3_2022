# Backend for FullStackOpen 2022 course

**Middlewares are run in the order they are presented.**

They must be taken **to use before routes**.

```js
app.use([middlewarename]);
```

## Express

```shell
npm install express
```

## Nodemon

```shell
npm install --save-dev nodemon
```

package.json
"dev": "nodemon index.js",

to run

```shell
npm run dev
```

## Morgan

"HTTP request logger middleware for node.js"
[check here](https://github.com/expressjs/morgan)

And "How To Use morgan in Your Express Project" By Cooper Makhijani
[Digital Ocean Tutorial](https://www.digitalocean.com/community/tutorials/nodejs-getting-started-morgan)

```shell
npm install morgan
```

### Reminder: How to remove node_modules from gitHub

[check it here](https://gist.github.com/lmcneel/45594e550a3403d589bdcaad38138a83)

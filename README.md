# Backend for FullStackOpen 2022 course

Runs in address
[muneka-deploy.herokuapp.com](https://muneka-deploy.herokuapp.com)
<br />
<br />

**! important:** set your MongoDB URI (with username and password) and port to .env file

> MONGODB_URI=[your mongoDB URI]
> PORT = [used port]

<br /> 
<br />

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

## CORS

Wneh attaching backend to front
[Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. [here](https://github.com/expressjs/cors).

```shell
npm install cors
```

## Heroku

Remember to use

```js
const PORT = process.env.PORT || 3001;
```

Remember to give config variables (.env file's content) to Heroku. by settings in heroku's site or

```shell
heroku config:set MONGODB_URI='mongodb+srv://<username>:<pasdsword>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'
```

### Reminder: How to remove node_modules from gitHub

[check it here](https://gist.github.com/lmcneel/45594e550a3403d589bdcaad38138a83)

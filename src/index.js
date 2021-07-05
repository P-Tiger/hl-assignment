import express from 'express';
import path from 'path';
import logger from 'morgan'
import routers from './routers';
import cookieParser from 'cookie-parser'
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app
  .use(express.json())
  .use(routers)
  .use(logger('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost');
console.info(`API Server started at http://%s:%d`, process.env.HOST || 'localhost', process.env.PORT || 3000);

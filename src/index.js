import express from 'express';
import path from 'path';
import logger from 'morgan'
import routers from './routers';
import cookieParser from 'cookie-parser'
import handlebars from 'handlebars';
import {
  cfg
} from './config'
const app = express();
// view engine setup
handlebars.registerHelper('handleClickFunny', (a, b) => {
  console.log(a, b)
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app
  .use(express.json())
  .use(cookieParser())
  .use(routers)
  .use(logger('dev'))
  .use(express.urlencoded({ extended: false }))
  .use("/public", express.static(path.join(__dirname, 'public')))

app.listen(cfg('APP_PORT', parseInt) || 3000, cfg('APP_HOST', String) || 'localhost');
console.info(`API Server started at http://%s:%d`, cfg('APP_HOST', String) || 'localhost', cfg('APP_PORT', parseInt) || 3000);

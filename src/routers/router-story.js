import express from 'express';
import {
    User
} from '../models';
import {
    renderErr
} from './helper';
import path from 'path'
const router = express.Router();

router.get('/', async (req, res, next) => {
    // let data = await User.getList({}, {});
    // return res.status(200).send(data);
    res.render('index', {
        title: "abc"
    });
});

export default router;
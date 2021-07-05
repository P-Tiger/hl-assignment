import express from 'express';
import _ from 'lodash';
import {
    User,
    UserStory,
    Story
} from '../models';
import {
    renderErr
} from './helper';
const router = express.Router();

/*
    Idea: 
        - When the user enters the site, there are 2 cases to handle 
            + Website already has cookies then I excluded all stories in the model UserStory
            + Website  without cookies, I create cookie in model User.

*/

router.get('/', async (req, res, next) => {
    let {
        cookies
    } = req
    let dataInsert = null
    let where = {}
    let user_id = null
    if (cookies && cookies.user_id) {
        // CheckUser
        let checkUser = await User.findOne({
            cookie: cookies.user_id
        })
        if (!checkUser) {
            return res.render('index', {
                title: 'Cookie not found',
            });
        }
        let userStory = await UserStory.find({
            user: checkUser._id
        })
        let stories = _.map(userStory, "story")
        where._id = {
            $nin: stories
        }
        user_id = checkUser._id
    } else {
        // Create Cookie with Model Cookie
        let uId = await User.getUuid();
        dataInsert = {
            cookie: uId
        }
    }
    // Insert Cookie
    if (dataInsert) {
        try {
            let data = await User.create(dataInsert)
            res.cookie('user_id', data.cookie)
            user_id = data._id
        } catch (error) {
            console.log(error);
            return res.render('index', {
                title: "Create Cookie Error",
            });
        }
    }
    // -------

    // Render View
    let story = await Story.findOne(where);
    if (!story) {
        return res.render('index', {
            title: "That's all the jokes for today! Come back another day!",
        });
    }

    res.render('index', {
        title: story.title,
        content: story.content,
        button: `
        <button onClick=handleClickFunny('${story._id}','${user_id}',${UserStory.TYPE_INTERACT_FUNNY.id}) id='btn2' class='btn btn-primary'>This is Funny!</button>
        <button id='btn1' onClick=handleClickFunny('${story._id}','${user_id}',${UserStory.TYPE_INTERACT_NOT_FUNNY.id}) class='btn btn-success'>This is not Funny!</button>
        `
    });
});
// This API to Create Story
router.post('/v1/story', async (req, res, next) => {
    let {
        title,
        content
    } = req.body
    // Because input only 2 field so I won't use package parameter.
    // https://www.npmjs.com/package/parameter 
    // Validator
    if (!content) {
        return renderErr("Story Create", res, 400, "content", 2)
    }
    if (!title) {
        return renderErr("Story Create", res, 400, "title", 2)
    }
    //  Insert data
    let dataInsert = {
        title: title,
        content: content
    }
    let data;
    try {
        data = await Story.create(dataInsert);
    } catch (error) {
        console.log(error)
        return renderErr("Story Create", res, 500, "Create Story");
    }
    return res.status(200).send(data)
});

export default router;
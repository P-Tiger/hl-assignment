import express from 'express';
import {
    User,
    UserStory,
    Story
} from '../models';
import {
    renderErr
} from './helper';
import _ from 'lodash';


const router = express.Router();

router.post('/v1/users-stories', async (req, res, next) => {
    let {
        user_id,
        story_id,
        interact
    } = req.body
    //#region Validator. 
    // Because input only 3 field so I won't use package parameter.
    // https://www.npmjs.com/package/parameter 
    let arrInteract = UserStory.ARR_INTERACT_TYPE
    let typeIds = _.map(arrInteract, "id")
    let isInclude = _.includes(typeIds, interact)
    if (!isInclude) {
        return renderErr("User Story Create", res, 400, "interact", 2)
    }
    if (!user_id) {
        return renderErr("user Story Create", res, 400, "user_id", 2)
    }
    if (!story_id) {
        return renderErr("user Story Create", res, 400, "story_id", 2)
    }
    if (user_id) {
        let checkData = await User.findById(user_id)
        if (!checkData) {
            return res.render(index, {
                title: "user Not found",
            })
        }
    }
    if (story_id) {
        let checkData = await Story.findById(story_id)
        if (!checkData) {
            return res.render(index, {
                title: "Story Not found",
            })
        }
    }
    if (user_id && story_id) {
        let checkConflict = await Story.findOne({
            user: user_id,
            story: story_id
        })
        if (checkConflict) {
            return res.render(index, {
                title: "Insert Database conflict",
            })
        }
    }
    //#endregion 
    // Insert Data.
    let dataInsert = {
        user: user_id,
        story: story_id,
        interact: interact
    }
    let data;
    try {
        data = await UserStory.create(dataInsert)
    } catch (error) {
        console.log(error)
        return res.render(index, {
            title: "user Story Create",
        })
    }
    res.status(200).send(data)
});



export default router;
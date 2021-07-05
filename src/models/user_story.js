import mongoose, { Schema } from 'mongoose'

const UserStory = mongoose.model("users_stories", mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'cookies'
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories'
    },
    interact: {
        type: Number,
    },
}, {
    timestamps: true
}))

//#region Enum
UserStory.TYPE_INTERACT_FUNNY = {
    id: 1,
    name: 'This is Funny!'
}
UserStory.TYPE_INTERACT_NOT_FUNNY = {
    id: -1,
    name: 'This is Not Funny!'
}
UserStory.ARR_INTERACT_TYPE = [
    UserStory.TYPE_INTERACT_FUNNY,
    UserStory.TYPE_INTERACT_NOT_FUNNY
]
//#region 

UserStory.getList = async (where, paging) => {
    let data = await UserStory.find();
    return data
}
export default UserStory
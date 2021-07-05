import mongoose from 'mongoose'
import {
    v4 as uuid
} from 'uuid';

const User = mongoose.model("users", mongoose.Schema({
    cookie: {
        type: String,
    },
}, {
    timestamps: true
}))
User.getList = async (where, paging) => {
    let data = await User.find();
    return data
}

User.getUuid = async () => {
    let uId = uuid();
    let where = {
        uuid: uId || ""
    }
    let data = await User.findOne(where);
    if (data) {
        return User.getUuid();
    }
    return uId
}

export default User
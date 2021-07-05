import mongoose from 'mongoose'

const Story = mongoose.model("Stories", mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
}, {
    timestamps: true
}))
Story.getList = async (where, paging) => {
    let data = await Story.find();
    return data
}
export default Story
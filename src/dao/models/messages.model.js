import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const messageCollection = 'messages';

const messagesSchema = mongoose.Schema({
    user: String,
    message: String
}, 
    {
        versionKey: false
    }
);
messagesSchema.plugin(mongoosepaginate);
const messagesModel = mongoose.model(messageCollection, messagesSchema);

export default messagesModel;
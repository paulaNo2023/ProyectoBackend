import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const userCollection = 'users';

const usersSchema = mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        email: String,
        age: Number,
        password: String
    },
    {
        versionKey: false
    });
usersSchema.plugin(mongoosepaginate);
const usersModel = mongoose.model(userCollection, usersSchema);

export default usersModel;
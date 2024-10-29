import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const userCollection = 'users';

const usersSchema = mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        email: String,
        age: Number,
        password: String,
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts"
        }, 
        role: {
            type: String,
            default: "user"
        }
    },
    {
        versionKey: false
    });
    usersSchema.pre('findOne', function (next) {
        this.populate("cart");
        next();
    })
    usersSchema.plugin(mongoosepaginate);
    const usersModel = mongoose.model(userCollection, usersSchema);

    export default usersModel;
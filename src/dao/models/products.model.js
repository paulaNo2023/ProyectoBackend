import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const productCollection = 'products';

const productsSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        thumbnails: String,
        code: String,
        stock: Number,
        status: Boolean,
        category: String
    },
    {
        versionKey: false
    });
productsSchema.plugin(mongoosepaginate);
const productsModel = mongoose.model(productCollection, productsSchema);

export default productsModel;
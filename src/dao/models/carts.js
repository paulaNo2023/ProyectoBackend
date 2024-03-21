import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const cartCollection = 'carts';

const cartsSchema = mongoose.Schema({
    products: {
        type: [
            {
                _id: false,
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }
        ],
        default: []
    }
},
    {
        versionKey: false
    }
);

cartsSchema.pre("findOne", function (next) {
    this.populate("products.product");
    next();
});
cartsSchema.plugin(mongoosepaginate);
const cartsModel = mongoose.model(cartCollection, cartsSchema);

export default cartsModel;
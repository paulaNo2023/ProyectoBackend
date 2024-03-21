import productsModel from "../models/products.js";

export default class Products {

    addProduct = async (producto) => {
        let result = await productsModel.create(producto);
        return result;
    };

    getProducts = async (limit, page, query, sort) => {
        let error = false;
        if ('available' in query) {
            if(query.available === 'true'){
                query = {stock: {$gt: 0}};
            } else if(query.available === 'false'){
                query = {stock: 0};
            }
        };
        let products = await productsModel.paginate(query, { limit: limit, page: page, sort: sort, lean: true }, (err, result) => {
            if (err) {
                error = true;
                return err;
            } else {
                return result;
            }
        });
        if (error) {
            return { error: products.message  };
            }
        return products;
    }

    getProductById = async (id) => {
        let product = undefined;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let product = await productsModel.findById(id).lean();
            return product;
        } else {
            return product;
        }
    }

    updateProduct = async (id, producto) => {
        let result = undefined;
        let exists = await productsModel.exists({ _id: id })
        if (id.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            result = productsModel.findByIdAndUpdate(id, { $set: producto }).lean();
            return result;
        } else {
            return result;
        }
    }

    deleteProduct = async (id) => {
        let result = undefined;
        let exists = await productsModel.exists({ _id: id })
        if (id.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            result = await productsModel.deleteOne({ _id: id });
            return result;
        } else {
            return result;
        }
    }

}
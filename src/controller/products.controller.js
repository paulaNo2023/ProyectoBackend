import { ProductsService } from '../service/products.service.js';

const productsService = new ProductsService();

export class ProductsController {
    constructor() {
    }

    getProducts = async (req, res) => {
        try {
            let limit = req.query.limit;
            let page = req.query.page;
            let sort = req.query.sort;
            let query = req.query.query;
            let link = URL;
            if (limit === undefined) {
                limit = 10;
            } else {
                link += `?limit=${limit}`;
            }

            if (page === undefined) {
                page = 1;
            }
            if (sort === undefined) {
                sort = {};
            } else {
                if (link.includes('?')) {
                    link += `&sort=${sort}`;
                } else {
                    link += `?sort=${sort}`;
                }
                if (sort === 'asc') {
                    sort = { price: 1 };
                } else if (sort === 'desc') {
                    sort = { price: -1 };
                }
            }
            if (!query) {
                query = {};
            } else {
                if (link.includes('?')) {
                    link += `&query=${query}`;
                } else {
                    link += `?query=${query}`;
                }
                query = query.split(':');
                query = { [query[0].trim()]: query[1].trim() };
            }
            const products = await productsService.getAll(limit, page, query, sort);
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvieron los productos',
                payload: products.docs
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No pudieron obtener los productos',
                payload: error
            });
        }
    }

    getProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productsService.getId(pid)
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvo el producto',
                payload: product
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo obtener el producto',
                payload: error
            });
        }
    }

    createProduct = async (req, res) => {
        try {
            const { title, description, price, thumbnails, code, stock, status, category } = req.body;
            if (!title || !description || !price || !thumbnails || !code || !stock, !status, !category) return res.status(400).send({
                status: 'error',
                message: 'Faltan datos'
            });
            const product = { title, description, price, thumbnails, code, stock, status, category };
            const result = await productsService.create(product);
            res.status(201).send({
                status: 'success',
                message: 'Se creó el producto',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo crear el producto',
                payload: error
            });
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const { title, description, price, thumbnails, code, stock, status, category } = req.body;
            if (!title || !description || !price || !thumbnails || !code || !stock, !status, !category) return res.status(400).send({
                status: 'error',
                message: 'Faltan datos'
            });
            const product = { title, description, price, thumbnails, code, stock, status, category };
            const result = await productsService.update(pid, product);
            res.status(200).send({
                status: 'success',
                message: 'Se actualizó el producto',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo actualizar el producto',
                payload: error
            });
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const result = await productsService.delete(pid);
            res.status(200).send({
                status: 'success',
                message: 'Se eliminó el producto',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo eliminar el producto',
                payload: error
            });
        }
    }
}
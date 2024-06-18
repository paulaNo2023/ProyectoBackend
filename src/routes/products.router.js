import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.js";

const URL = 'http://localhost:8080/api/products'

const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let sort = req.query.sort;
    let query = req.query.query;
    let link = URL;
    let response = {};
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
    if (query === undefined) {
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
    const productos = await productManager.getProducts(limit, page, query, sort);
    let prevLink = link;
    let nextLink = link;
    if (productos.error) {
        response = {
            status: 'error',
            payload: {
                error: productos.error.message
            },
            totalPages: null,
            prevPage: null,
            nextPage: null,
            page: null,
            hasPrevPage: null,
            hasNextPage: null,
            prevLink: null,  
            nextLink: null      
        }
    } else {
        response = {
            status: 'success',
            payload: {
                products: productos.docs
            },
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? prevLink += link.includes('?') ? `&page=${productos.prevPage}` : `?page=${productos.prevPage}` : null,
            nextLink: productos.hasNextPage ? nextLink += link.includes('?') ? `&page=${productos.nextPage}` : `?page=${productos.prevPage}` : null
        }
    }

    res.json(response);
});

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const producto = await productManager.getProductById(pid);
    if (producto != undefined) {
        res.json(producto);
    } else {
        res.json({ error: 'Producto no encontrado' });
    }
});

router.post('/', async (req, res) => {
    const producto = req.body;
    try {
        await productManager.addProduct(producto)
            .then(res.json({ status: 'success', message: 'Se creó el producto' }));
    } catch (error) {
        res.json({ status: 'failed', message: 'Producto no pudó ser creado', error: error })
    }

});

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const producto = req.body;
    try {
        let result = await productManager.updateProduct(pid, producto);
        if (result != undefined) {
            res.json(res.json({ status: 'success', message: 'Se actualizó el producto' }));
        } else {
            res.json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.json({ status: 'failed', message: 'Producto no pudó ser actualizado', error: error })
    }
});

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        let result = await productManager.deleteProduct(pid);
        if (result != undefined) {
            res.json(res.json({ status: 'success', message: 'Se borró el producto' }));
        } else {
            res.json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.json({ status: 'failed', message: 'Producto no pudó ser eliminado', error: error })
    }
});

export default router;
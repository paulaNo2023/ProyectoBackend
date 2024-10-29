import { Router } from "express";
import { ProductsService } from '../service/products.service.js';
import { CartsService } from "../service/carts.service.js";
import { TicketsService } from "../service/tickets.service.js";


const URL = 'http://localhost:8080/products'

const productsService = new ProductsService();
const cartsService = new CartsService();
const ticketsService = new TicketsService();

const router = Router();

router.get('/products', async (req, res) => {
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
    let prevLink = link;
    let nextLink = link;
    const productos = await productsService.getAll(limit, page, query, sort);
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
            prevLink: productos.hasPrevPage ? prevLink += (link.includes('?') ? `&page=${productos.prevPage}` : `?page=${productos.prevPage}`) : null,
            nextLink: productos.hasNextPage ? nextLink += (link.includes('?') ? `&page=${productos.nextPage}` : `?page=${productos.nextPage}`) : null,
        }
    }
    res.render('products', { response, user: req.session.user });
});

router.get('/carts/:cid', async (req, res) => {
    let cid = req.params.cid;
    const cart = await cartsService.getId(cid);
    const products = cart.products;
    let total = products.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.quantity * currentProduct.product.price;
    }, 0);
    res.render('carts', { products, cid, total });
});

router.get('/', async (req, res) => {
    res.render('login');
});

router.get('/register', async (req, res) => {
    res.render('register');
});

router.post('/tickets', async (req, res) => {
    let {total} = req.body;
    let ticket = {
        total,
        user: req.session.user.email
    }
    let resul = ticketsService.create(ticket);
    res.render('tickets', { resul });
});

router.get('/profile', async (req, res) => {
    res.render('profile',
        {
            user: req.session.user
        });
});

export default router;
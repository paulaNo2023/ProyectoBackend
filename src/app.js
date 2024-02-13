import ProductManager from "ProductManager";
import express from "express";
import {fileURLToPath} from 'url;'
import {dirname} from 'path';

const _filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express()
const port = 8080

app.get("/productos", (req,res)=>{

    let {producto,limit} = req.query
    let data = product.filter((producto)=> (product.producto == product))
    if(!data) 
    return res.send ("Usuario no encontrado")


    res.json(product)
})

app.get("/Productos/:pid", (req,res)=>{
    let productId = rqe.params.productId
    let data = product.find((producto)=> (producto.id== productId))
    if (!data) return res.send("No se encuentra")
    res.send(data)
})



let product = {
    "title": "Iphone",
    "description": "Celular de alta gama",
    "price": "$6.000.000",
    "thumbnail" : "NA",
    "code": 123,
    "stock" : 15

}


import express from "express";
import ProductManager from './ProductsManager.js';
const app = express();

const productManager = new ProductManager()
let products = [];
const PM = async ()=> {
    let productsPM = await productManager.getProducts();
    products = productsPM;
    return products;
} 

app.get("/products", (req, res) => {
    let limit = parseInt(req.query.limit);
    PM();
    if(limit > 0) {
        let newProd = products.slice(0, limit)
        res.send(newProd)
    } else {
        res.send(products)
    }
    
})

app.get("/products/:pid", (req, res) => {
    PM();
    let productId = req.params.pid;
    let usuario = products.find(u=>u.id === parseInt(productId) )
    if (!usuario) return res.send("Usuario no encontrado")
    res.send(usuario)
})



app.listen(8080, () => {
    "escuchando puerto 8080"
})
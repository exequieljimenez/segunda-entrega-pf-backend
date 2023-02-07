import express from 'express';
const {Router} = express

import { carritosDao } from '../daos/index.js';
import { productosDao } from '../daos/index.js';

const carritosRouter = new Router()

carritosRouter.use(express.json())
carritosRouter.use(express.urlencoded({extended: true}))

carritosRouter.post('/', async (req, res) => {
    const carritoId = await carritosDao.guardar()
    res.send(`Carrito creado con el id ${carritoId}`)
})

carritosRouter.get('/', async (req, res) => {
    const carritos = await carritosDao.listarAll()
    res.send({carritos})
})

carritosRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const carrito = await carritosDao.listar(id)
    res.send({carrito})
})

carritosRouter.put('/:id/productos', async (req, res) => {
    const carritoId = req.params.id
    const carrito = await carritosDao.listar(carritoId)
    const producto = await productosDao.listar(req.body.id)
    carrito.productos.push(producto)
    await carritosDao.actualizar(carritoId, carrito)
    res.send("Carrito actualizado")
})

carritosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    await carritosDao.borrar(id)
    res.send("Carrito borrado")
})

carritosRouter.delete('/', async (req, res) => {
    await carritosDao.borrarAll()
    res.send("Coleccion borrada")
})

export default carritosRouter

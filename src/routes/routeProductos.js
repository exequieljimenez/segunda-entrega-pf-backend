import express from 'express';
const {Router} = express

import { productosDao } from '../daos/index.js';

const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({extended: true}))

productosRouter.post('/', async (req, res) => {
    const data = req.body;
    const productId = await productosDao.guardar(data)
    res.send(`Producto guardado con id ${productId}`)
})

productosRouter.get('/', async (req, res) => {
    const productos = await productosDao.listarAll()
    res.send({productos})
})

productosRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const producto = await productosDao.listar(id)
    res.send({producto})
})

productosRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    await productosDao.actualizar(id, data)
    res.send("producto actualizado")
})

productosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    await productosDao.borrar(id)
    res.send("Producto eliminado")
})

productosRouter.delete('/', async (req, res) => {
    await productosDao.borrarAll()
    res.send("Colección borrada")
})

export default productosRouter


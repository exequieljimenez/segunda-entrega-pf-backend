import express from 'express';
import productosRouter from './routes/routeProductos.js';
import carritosRouter from './routes/routeCarritos.js';

const app = express()

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

export default app
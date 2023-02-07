import mongoose, { mongo } from "mongoose";
mongoose.set('strictQuery', true)
import config from "../config.js";

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async guardar(producto) {
        try {
            const largoArray = await this.coleccion.find({})
            let id
            if (largoArray == 0) {
                id = 1
            }
            else {
                id = largoArray.length + 1
            }
            const nuevoProducto = {id: id, ...producto}
            await this.coleccion.create(nuevoProducto)
            return id
        } catch (error) {
            console.log(error);
        } 
    }

    async listarAll() {
        try {
            const listaTodos = await this.coleccion.find({})
            return listaTodos;
            
        } catch (error) {
            console.log(error);
        }
    }

    async listar(id) {
        try {
            const productoPorId = await this.coleccion.findOne({id: id})
            return productoPorId
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(id, data) {
        try {
            await this.coleccion.updateOne({ id: id }, { $set: data})
        } catch (error) {
            console.log(error)
        }
    }

    async borrar(id) {
        try {
            await this.coleccion.deleteOne({id: id})
        } catch (error) {
            console.log(error);
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            console.log(error);
        }
    }
  
}

export default ContenedorMongoDb
import admin from 'firebase-admin';
import config from '../config.js'

admin.initializeApp({credential: admin.credential.cert(config.firebase), databaseURL: 'https://segunda-entrega-1.firebaseio.com'})

const db = admin.firestore();

class ContenedorFirebase {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async guardar(nuevoElem) {
        try {
            let id
            const querySnapshot = await this.coleccion.get()
            let docs = querySnapshot.docs
            const response = docs.map((doc) => ({
                id: doc.id
            }))
            if (response.length == 0) {
                id = 1
            } else {
                id = response.length + 1
            }
            let doc = this.coleccion.doc(`${id}`)
            await doc.create(nuevoElem)
            return id
        } catch (error) {
            console.log(error);
        }
    }

    async listarAll() {
        try {
            const querySnapshot = await this.coleccion.get()
            let docs = querySnapshot.docs
            const response = docs.map((doc) => ({
                id: doc.id,
                nombre: doc.data().nombre,
                precio: doc.data().precio
            }))
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async listar(id) {
        try {
            const doc = this.coleccion.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(id, data) {
        try {
            const doc = this.coleccion.doc(`${id}`)
            await doc.update(data)
        } catch (error) {
            console.log(error);
        }
    }

    async borrar(id) {
        try {
            const doc = this.coleccion.doc(`${id}`)
            await doc.delete()
        } catch (error) {
            console.log(error)
        }
    }

}

export default ContenedorFirebase
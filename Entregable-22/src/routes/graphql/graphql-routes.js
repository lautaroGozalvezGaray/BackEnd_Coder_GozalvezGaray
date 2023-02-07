const { buildSchema  } = require('graphql')

const schema = buildSchema(`
input PersonaInput {
    nombre: String,
    edad: Int
  }
  type Persona {
    id: ID!
    nombre: String,
    edad: Int
  }
  type Query {
    getPersona(id: ID!): Persona,
    getPersonas(campo: String, valor: String): [Persona],
  }
  type Mutation {
    createPersona(datos: PersonaInput): Persona
    updatePersona(id: ID!, datos: PersonaInput): Persona,
    deletePersona(id: ID!): Persona,
  }
`)


// Clase ____________________________________________________________
class Producto {
    constructor(id, {nombre, edad}){
        this.id = id
        this.nombre = nombre
        this.edad = edad
    }
}


/// funciones de persistencia

const productosMap = {};

function getproductos({ campo, valor }) {
    const productos = Object.values(productosMap)
    if (campo && valor) {
        return productos.filter(p => p[ campo ] == valor);
    } else {
        return productos;
    }
}

function getProducto({ id }) {
    if (!productosMap[ id ]) {
        throw new Error('producto not found.');
    }
    return productosMap[ id ];
}

function createPersona({ datos }) {
    const id = crypto.randomBytes(10).toString('hex');
    const nuevaProducto = new Producto(id, datos)
    productosMap[ id ] = nuevaProducto;
    return nuevaProducto;
}

function updateProducto({ id, datos }) {
    if (!productosMap[ id ]) {
        throw new Error('Persona not found');
    }
    const productosActualizada = new Producto(id, datos)
    productosMap[ id ] = personaActualizada;
    return productosActualizada;
}

function deleteProdcutos({ id }) {
    if (!productosMap[ id ]) {
        throw new Error('Producto not found');
    }
    const productosBorrada = productosMap[ id ]
    delete productosMap[ id ];
    return productoBorrada;
}

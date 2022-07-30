const Contenedor = require("./contenedor");

const contenedor = new Contenedor("products.json");

const test = async()=>{
    const id1 = await contenedor.save({title: "goma", price: 50});
    const id2 = await contenedor.save({title: "cartuchera", price: 1599});
    const id3 = await contenedor.save({title: "fibron", price: 350});
    

    console.log(id1, id2,id3)


}

test();


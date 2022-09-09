const Contenedor = require("./contenedor");

const contenedor = new Contenedor("./products.txt");

const test = async()=>{
    /* const id1 = await contenedor.save({title: "goma", price: 50});
    const id2 = await contenedor.save({title: "cartuchera", price: 1599});
    const id3 = await contenedor.save({title: "fibron", price: 350}); */
    
    //await contenedor.deleteById(2) // {"title": "cartuchera","price": 1599,"id": 2}

    const allObjet = await contenedor.getAll(); //[{"title": "goma","price": 50,"id": 1},{"title": "fibron","price": 350,"id": 3}]
    console.log(allObjet);
 

    //const Objet = await contenedor.getById(1);
    //console.log(Objet); //{"title": "goma","price": 50,"id": 1}

    //await contenedor.deleteAll() 
    


}

test();


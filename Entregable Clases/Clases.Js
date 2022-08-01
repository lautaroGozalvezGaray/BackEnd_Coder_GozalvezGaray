class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }

    getFullName(){
      return `Nombre completo: ${this.nombre} ${this.apellido}`;
    };

    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBooks(titulo, nombre){
        this.libros.push({nombre: titulo, autor: nombre})
    }

    getBooksName(){
        return this.libros.map(libro=>libro.nombre)
    }

}

const lautaro = new Usuario("lautaro", "gozalvez", [{nombre: "Principito", autor: "Antoine de Saint-Exupéry"}], ["negra"]);

lautaro.addMascota("filomena");
lautaro.addBooks("libro2", "marcos")
console.log(lautaro);
console.log(lautaro.countMascotas());
console.log(lautaro.getBooksName())








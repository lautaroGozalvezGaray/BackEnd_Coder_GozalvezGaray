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

console.log(lautaro.getFullName());
console.log(lautaro);
lautaro.addBooks("libro2", "marcos")
lautaro.addMascota("filomena");
console.log(lautaro.countMascotas());
console.log(lautaro.getBooksName())


/* Nombre completo: lautaro gozalvez
Usuario {
  nombre: 'lautaro',
  apellido: 'gozalvez',
  libros: [ { nombre: 'Principito', autor: 'Antoine de Saint-Exupéry' } ],
  mascotas: [ 'negra' ]
}
2
[ 'Principito', 'libro2' ] */





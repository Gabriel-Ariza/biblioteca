const libro1 = {
    imagen: "img/100anos.webp",
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    año: "1967",
    estado: "disponible",
};
const libro2 = {
    imagen: "img/donquijote.webp",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    año: "1605",
    estado: "prestado",
};
const libro3 = {
    imagen: "img/principito.webp",
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    año: "1943",
    estado: "disponible",
};


const libro4 = {
    imagen: "img/ruidocosas.webp",
    titulo: "El ruido de las cosas",
    autor: "Juan Gabriel Vásquez",
    año: "2011",
    estado: "prestado",
};
const libro5 = {
    imagen: "img/naranjas.webp",
    titulo: "Cinco cuartos de naranja",
    autor: "Joanne Harris",
    año: "2000",
    estado: "disponible",
};
const libro6 = {
    imagen: "img/delirio.webp",
    titulo: "Delirio",
    autor: "Laura Restrepo",
    año: "2004",
    estado: "prestado",
};

/* const ista_libros = [libro1, libro2, libro3, libro4, libro5, libro6] */

export function libreria() {
    const lista_libros = [libro1, libro2, libro3, libro4, libro5, libro6]
    localStorage.setItem("libreria", JSON.stringify(lista_libros))
}

// localStorage.clear
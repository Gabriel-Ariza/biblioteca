import { libro1, libro2, libro3,} from './libros.js';


// Función para mostrar un libro en el DOM
function mostrarLibro(libro) {
    const contenedorTarjetas = document.getElementById('contenedor_tarjetas');
    
    // Crear la estructura de la tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjetas');
    
    const contenedorImagen = document.createElement('div');
    contenedorImagen.classList.add('contenedor_imagen');
    const imagen = document.createElement('img');
    imagen.src = `img/${libro.imagen}`;
    contenedorImagen.appendChild(imagen);
    
    const contenedorTexto = document.createElement('div');
    contenedorTexto.classList.add('contenedor_texto');
    
    const parrafo = document.createElement('p');
    parrafo.innerHTML = `
        <span class="txt">Titulo: </span>${libro.titulo}<br>
        <span class="txt">Autor: </span>${libro.autor}<br>
        <span class="txt">Año: </span>${libro.año}<br>
        <span class="txt">Estado: </span>${libro.estado}<br>
    `;
    
    contenedorTexto.appendChild(parrafo);
    
    tarjeta.appendChild(contenedorImagen);
    tarjeta.appendChild(contenedorTexto);
    
    contenedorTarjetas.appendChild(tarjeta);
}

  // Función para limpiar la biblioteca en el DOM
function clearLibrary() {
    const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
    contenedorTarjetas.innerHTML = '';
}
function ordenarPorTitulo() {
    const sortedBooks = [libro1, libro2, libro3].sort((a, b) => {
        const titleA = a.titulo.toUpperCase();
        const titleB = b.titulo.toUpperCase();
        return titleA.localeCompare(titleB);
    });

    clearLibrary();
    sortedBooks.forEach(libro => mostrarLibro(libro));
}
// Mostrar los libros en el HTML inicialmente
mostrarLibro(libro1);
mostrarLibro(libro2);
mostrarLibro(libro3);


// Agregar un event listener al botón "Guardar"
const boton = document.getElementById('boton_guardar');

boton.addEventListener('click', function() {
    const selectedValue = document.getElementById('selector').value;
    ordenarPorTitulo()
    console.log("boton clickeado")
/*     } else if (selectedValue === 'titulo-desc') {
        sortByTitleDesc();
    } else if (selectedValue === 'autor-asc') {
        sortByAuthorAsc();
    } else if (selectedValue === 'año-reciente') {
        sortByYearRecent();
    } else if (selectedValue === 'año-antiguo') {
        sortByYearOld();
    } */
});
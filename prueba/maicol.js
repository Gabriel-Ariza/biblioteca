import {libreria} from './libros.js';
import {crearLibro} from './crear.js';
import {sortPorAutor, sortPorAño, sortPorAñoReverse, sortPorEstado, sortPorEstadoReverse, sortPorTitulo, sortPorTituloReverse} from './orden.js';
import { tarjetaActualizadaEvent } from './orden.js';

export const contenedorTarjetas = document.getElementById('padre');
export const boton_seleccion = document.getElementById('boton_guardar');


libreria() // guardamos los libros por defecto en el local storage
export const lista_original = JSON.parse(localStorage.getItem('libreria'))
export const lista_libros = JSON.parse(JSON.stringify(lista_original));


// CARGAMOS LOS LIBROS POR DEFECTO SOLO UNA VEZ
function cargarLibrosExistentes() {
    lista_original.forEach(libro => {
        crearLibro(libro)
    })
}
cargarLibrosExistentes();

export function añadirLibroLista(objeto_a_crear) {
    let nuevo_libro =  {
        imagen: objeto_a_crear.imagen,
        titulo: objeto_a_crear.titulo,
        autor: objeto_a_crear.autor,
        año: objeto_a_crear.año,
        estado: objeto_a_crear.estado,
    };
    lista_libros.push(nuevo_libro);
    crearLibro(nuevo_libro)
    contenedorTarjetas.dispatchEvent(tarjetaActualizadaEvent);
    console.log('Evento Disparado')
}

boton_seleccion.addEventListener('click', function() {
    let opcion_actual = document.getElementById('selector').value;
    
    if (opcion_actual === 'tituloAZ') {
        sortPorTitulo(lista_libros)
    } else if (opcion_actual === 'tituloZA') {
        sortPorTituloReverse(lista_libros);
    } else if (opcion_actual === 'autorAZ') {
        sortPorAutor(lista_libros);
    } else if (opcion_actual === 'añoAZ') {
        sortPorAño(lista_libros);
    } else if (opcion_actual === 'añoZA') {
        sortPorAñoReverse(lista_libros);
    } else if (opcion_actual === 'disponible') {
    sortPorEstado(lista_libros);
    } else if (opcion_actual === 'prestado') {
    sortPorEstadoReverse(lista_libros);
    }
});
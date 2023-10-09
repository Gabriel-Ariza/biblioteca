import { contenedorTarjetas, lista_libros } from './maicol.js';
import {crearLibro} from './crear.js'

function aplicarSubrayado(clase) {
    const elementos = document.querySelectorAll(`.${clase}`);
    elementos.forEach(elemento => {
        let contenido = elemento.textContent;

        if (clase === 'año') {
            elemento.style.backgroundColor = 'black';
            elemento.style.color = '#6cd3ff';
        } else if (clase === 'aut') {
            elemento.style.backgroundColor = 'black';
            elemento.style.color = '#6cd3ff';
        } else if (clase === 'est') {
            elemento.style.backgroundColor = 'black';
            elemento.style.color = '#6cd3ff';
        } else if (clase === 'tit') {
            let primeraLetra = contenido.charAt(0);
            elemento.innerHTML = `<span style="background-color: black; color: #6cd3ff; padding: 0 2px">
            ${primeraLetra}</span>${contenido.slice(1)}`;
        }
    });
}


export const tarjetaActualizadaEvent = new CustomEvent('tarjetaActualizada', { bubbles: true });
let ultimaFuncionUtilizada = null;


document.getElementById('padre').addEventListener('tarjetaActualizada', () => {
    console.log(ultimaFuncionUtilizada)
    if (ultimaFuncionUtilizada) {
        console.log('se almacenó una funcion:', ultimaFuncionUtilizada)
        contenedorTarjetas.innerHTML = '';
        ultimaFuncionUtilizada(lista_libros);
        console.log(lista_libros)
        aplicarSubrayado(ultimaFuncionUtilizada.tipoSubrayado);
    }
});


export function sortPorTitulo(libros_ordenados) {
    let lista = libros_ordenados.sort((a, b) => {
        let tituloA = a.titulo.toLowerCase();
        let tituloB = b.titulo.toLowerCase();
        return tituloA.localeCompare(tituloB);
    });
    contenedorTarjetas.innerHTML = '';
    lista.forEach(libro => {
        crearLibro(libro);
    });
    aplicarSubrayado('tit');
    ultimaFuncionUtilizada = sortPorTitulo;
    console.log(ultimaFuncionUtilizada)
}


export function sortPorTituloReverse(libros_ordenados) {
    let lista = libros_ordenados.sort((a, b) => {
        let tituloA = a.titulo.toLowerCase();
        let tituloB = b.titulo.toLowerCase();
        return tituloB.localeCompare(tituloA);
    });
    contenedorTarjetas.innerHTML = '';
    lista.forEach(libro => {
        crearLibro(libro);
    });
    aplicarSubrayado('tit');
    ultimaFuncionUtilizada = sortPorTitulo;
    console.log(ultimaFuncionUtilizada)
}


export function sortPorAutor(libros_ordenados) {
    let lista = libros_ordenados.sort((a, b) => {
        let autorA = a.autor.toLowerCase();
        let autorB = b.autor.toLowerCase();
        return autorA.localeCompare(autorB);
    });
    contenedorTarjetas.innerHTML = '';
    lista.forEach(libro => {
        crearLibro(libro);
        aplicarSubrayado('aut');
    });
    ultimaFuncionUtilizada = sortPorTitulo;
    console.log(ultimaFuncionUtilizada)
}


export function sortPorAño(libros_ordenados) {
    let lista = libros_ordenados.sort((a, b) => {
        return parseInt(b.año) - parseInt(a.año);
    });
    contenedorTarjetas.innerHTML = '';
    lista.forEach(libro => {
        crearLibro(libro);
        aplicarSubrayado('año');
    });
    ultimaFuncionUtilizada = sortPorTitulo;
    console.log(ultimaFuncionUtilizada)
}


export function sortPorAñoReverse(libros_ordenados) {
    let lista = libros_ordenados.sort((a, b) => {
        return parseInt(a.año) - parseInt(b.año);
    });
    contenedorTarjetas.innerHTML = '';
    lista.forEach(libro => {
        crearLibro(libro);
        aplicarSubrayado('año');
    });
    ultimaFuncionUtilizada = sortPorTitulo;
    console.log(ultimaFuncionUtilizada)
}


export function sortPorEstado(libros_ordenados) {
    const lista = libros_ordenados.filter(libro => libro.estado === "disponible");
    if (lista && lista.length > 0) {
        contenedorTarjetas.innerHTML = '';
        lista.forEach(libro => {
            crearLibro(libro);
        });
        aplicarSubrayado('est'); // Aplicar subrayado al estado
        ultimaFuncionUtilizada = sortPorEstado;
        console.log(ultimaFuncionUtilizada);
    } else {
        console.log("La lista de libros está vacía");
    }
}


export function sortPorEstadoReverse(libros_ordenados) {
    const lista = libros_ordenados.filter(libro => libro.estado === "prestado");
    if (lista && lista.length > 0) {
        contenedorTarjetas.innerHTML = '';
        lista.forEach(libro => {
            crearLibro(libro);
        });
        aplicarSubrayado('est'); // Aplicar subrayado al estado
        ultimaFuncionUtilizada = sortPorEstado;
        console.log(ultimaFuncionUtilizada);
    } else {
        console.log("La lista de libros está vacía");
    }
}
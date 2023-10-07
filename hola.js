import {libreria} from './libros.js';

const contenedorTarjetas = document.getElementById('padre');
const boton_seleccion = document.getElementById('boton_guardar');

libreria()
const lista_libros = JSON.parse(localStorage.getItem('libreria'))
localStorage.removeItem('libreria'[0])
console.log(JSON.parse(localStorage.getItem('libreria')))

function crearLibro(libro) {

    let tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjetas');

    let contentImagen = document.createElement('div');
    contentImagen.classList.add('contenedor_imagen');
    let imagen = document.createElement('img');
    imagen.src = `img/${libro.imagen}`;
    contentImagen.appendChild(imagen);

    let contentTexto = document.createElement('div');
    contentTexto.classList.add('contenedor_texto');

    let parrafo = document.createElement('p');
    parrafo.innerHTML = `
        <span class="txt">Titulo: </span><span class="tit">${libro.titulo}</span><br>
        <span class="txt">Autor: </span><span class="aut">${libro.autor}</span><br>
        <span class="txt">Año: </span><span class="año">${libro.año}</span><br>
        <span class="txt">Estado: </span><span class="est">${libro.estado}</span><br>
    `;
    contentTexto.appendChild(parrafo);
    
    tarjeta.appendChild(contentImagen);
    tarjeta.appendChild(contentTexto);
    
    contenedorTarjetas.appendChild(tarjeta);
}

function cargarLibrosExistentes() {
    lista_libros.forEach(libro => {
        crearLibro(libro)
    })
}
cargarLibrosExistentes();

function aplicarSubrayado(clase) {
    const elementos = document.querySelectorAll(`.${clase}`);
    elementos.forEach(elemento => {
        let contenido = elemento.textContent;

        if(clase === 'año') {
            elemento.style.backgroundColor = 'black';
            elemento.style.color = '#6cd3ff';
        }
        if(clase === 'aut') {
            elemento.style.backgroundColor = 'black';
            elemento.style.color = '#6cd3ff';
        }
        if(clase === 'tit') {
            let primeraLetra = contenido.charAt(0);
            elemento.innerHTML = `<span style="background-color: black; color: #6cd3ff; padding: 0 2px">
            ${primeraLetra}</span>${contenido.slice(1)}`;
        }
    });
}

function ordenarPorAño() {
    let libros_ordenados = lista_libros.sort((a, b) => {
        return parseInt(b.año) - parseInt(a.año);
    });

    contenedorTarjetas.innerHTML = '';
    libros_ordenados.forEach(libro => crearLibro(libro));
    aplicarSubrayado('año')
}
function ordenarPorAñoReverse() {
    let libros_ordenados = lista_libros.sort((a, b) => {
        return parseInt(a.año) - parseInt(b.año);
    });

    contenedorTarjetas.innerHTML = '';
    libros_ordenados.forEach(libro => crearLibro(libro));
    aplicarSubrayado('año');
}


function ordenarPorTitulo() {
    let libros_ordenados = lista_libros.sort((a, b) => {
        let tituloA = a.titulo.toLowerCase();
        let tituloB = b.titulo.toLowerCase();
        return tituloA.localeCompare(tituloB);
    });
    contenedorTarjetas.innerHTML = '';
    libros_ordenados.forEach(libro => crearLibro(libro));

    aplicarSubrayado('tit')
}
function ordenarPorTituloReverse() {
    let libros_ordenados = lista_libros.sort((a, b) => {
        let tituloA = a.titulo.toLowerCase();
        let tituloB = b.titulo.toLowerCase();
        return tituloB.localeCompare(tituloA);
    });
    contenedorTarjetas.innerHTML = '';
    libros_ordenados.forEach(libro => crearLibro(libro));
    aplicarSubrayado('tit');
}

function ordenarPorAutor() {
    let libros_ordenados = lista_libros.sort((a, b) => {
        let autorA = a.autor.toLowerCase();
        let autorB = b.autor.toLowerCase();
        return autorA.localeCompare(autorB);
    });
    contenedorTarjetas.innerHTML = '';
    libros_ordenados.forEach(libro => crearLibro(libro));
    aplicarSubrayado('aut');
}


window.addEventListener('load', function() {
    console.log('La pagina se cargo')
});



boton_seleccion.addEventListener('click', function() {
    let opcion_actual = document.getElementById('selector').value;
    
    if (opcion_actual === 'tituloAZ') {
        ordenarPorTitulo()
    } else if (opcion_actual === 'tituloZA') {
        ordenarPorTituloReverse();
    } else if (opcion_actual === 'autorAZ') {
        ordenarPorAutor();
    } else if (opcion_actual === 'añoAZ') {
        ordenarPorAño();
    } else if (opcion_actual === 'añoZA') {
        ordenarPorAñoReverse();
    }
});

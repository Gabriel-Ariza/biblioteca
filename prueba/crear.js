import { contenedorTarjetas, lista_libros } from './maicol.js';
import { inicializarModal_modificar } from './modificar.js';
import { inicializarModal } from './modal.js';

export let contexto_modal = null;
export function crearLibro(libro) {

    let tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjetas');
    let contenidoFrontal = crearContenidoFrontal(libro);
    let contenidoTrasero = crearContenidoTrasero(tarjeta);

    tarjeta.appendChild(contenidoFrontal);
    tarjeta.appendChild(contenidoTrasero);
    contenedorTarjetas.appendChild(tarjeta);

    let eliminarBtn = tarjeta.querySelector('.boton-eliminar');
    if (eliminarBtn) {
        eliminarBtn.addEventListener('click', () => {
            let disponibles = lista_libros.filter(libro => libro.estado === "disponible");
            let prestados = lista_libros.filter(libro => libro.estado === "prestado");

            if (contenedorTarjetas.children.length === 1) {
                alert('Debe haber al menos un libro en la biblioteca');
            } else if((disponibles.length === 1 && prestados.length === 1)) {
                alert('Debe haber al menos un libro de cada estado');
            } else {
                let indice = lista_libros.findIndex(libroLista => libroLista.titulo === libro.titulo);
                if (indice !== -1) {
                    lista_libros.splice(indice, 1);
                    console.log(`El libro "${libro.titulo}" ha sido eliminado de la copia.`);
                } else {
                    console.log(`El libro "${libro.titulo}" no existe en la copia.`);
                }
                console.log("Libro Eliminado: ",libro);
                console.log(lista_libros);
                tarjeta.remove()
            }
        });
    }
    let modificarBtn = tarjeta.querySelector('.boton-modificar');
    if(modificarBtn) {

        modificarBtn.addEventListener('click', () => {
            let modificar_libro = lista_libros.find(libroLista => libroLista.titulo === libro.titulo);
            if(modificar_libro) {
                contexto_modal = 'modificar'
                console.log(`contexto modo: ${contexto_modal}`)
                inicializarModal_modificar(modificarBtn, modificar_libro)
                let contenidoViejo = tarjeta.querySelector('.contenido-frontal');
                contenidoViejo.remove()
                let contenidoNuevo = crearContenidoFrontal(modificar_libro);
                tarjeta.appendChild(contenidoNuevo);
                console.log(modificar_libro)
                // CARGAMOS LOS LIBROS POR DEFECTO SOLO UNA VEZ
            }
        });
    }
    tarjeta.addEventListener('mouseenter', () => {
        tarjeta.classList.add('girar');
    });
    tarjeta.addEventListener('mouseleave', () => {
        tarjeta.classList.remove('girar');
    });
}

const boton_crear = document.getElementById('boton_crear');
boton_crear.addEventListener('click', () => {
    contexto_modal = 'crear';
    console.log(`contexto modo: ${contexto_modal}`)
    inicializarModal(boton_crear)
})



function crearContenidoFrontal(info_libro) {
    let contenidoFrontal = document.createElement('div');
    contenidoFrontal.classList.add('contenido-frontal');
    let contentImagen = document.createElement('div');
    contentImagen.classList.add('contenedor_imagen');
    let imagen = document.createElement('img');
    imagen.src = `${info_libro.imagen}`;
    contentImagen.appendChild(imagen);
    let contentTexto = document.createElement('div');
    contentTexto.classList.add('contenedor_texto');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = `
        <span class="txt">Titulo: </span><span class="tit">${info_libro.titulo}</span><br>
        <span class="txt">Autor: </span><span class="aut">${info_libro.autor}</span><br>
        <span class="txt">Año: </span><span class="año">${info_libro.año}</span><br>
        <span class="txt">Estado: </span><span class="est">${info_libro.estado}</span><br>
    `;
    contentTexto.appendChild(parrafo);
    contenidoFrontal.appendChild(contentImagen);
    contenidoFrontal.appendChild(contentTexto);
    return contenidoFrontal;
}

function crearContenidoTrasero() {
    let contenidoTrasero = document.createElement('div');
    contenidoTrasero.classList.add('contenido-trasero');

    let modificarBtn = document.createElement('button');
    modificarBtn.innerText = 'Modificar';
    modificarBtn.classList.add('boton-modificar');

    let eliminarBtn = document.createElement('button');
    eliminarBtn.innerText = 'Eliminar';
    eliminarBtn.classList.add('boton-eliminar');

    contenidoTrasero.appendChild(modificarBtn);
    contenidoTrasero.appendChild(eliminarBtn);
    return contenidoTrasero;
}
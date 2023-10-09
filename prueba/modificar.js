import { contexto_modal, crearLibro } from "./crear.js";
import { contenedorTarjetas, lista_libros } from "./maicol.js";
import { tarjetaActualizadaEvent } from "./orden.js";

export function inicializarModal_modificar(boton_llamado, libro) {

    let modal = document.getElementById("modal");
    let boton_mostrar = boton_llamado//document.getElementById("llamarModal");
    let boton_x = document.getElementById("boton_x");
    let boton_cancelar = document.getElementById("cancelarModal");
    const formulario = document.getElementById("formulario_libro");

    function mostrarModal() {
        formulario.reset()
        document.getElementById("encabezado").textContent = "Modificar Libro";
        modal.style.display = "flex";

        formulario.querySelector("#imagen").value = libro.imagen;
        formulario.querySelector("#titulo").value = libro.titulo;
        formulario.querySelector("#autor").value = libro.autor;
        formulario.querySelector("#año").value = libro.año;
        formulario.querySelector("#estado").value = libro.estado;
        formulario.querySelector("button[type='submit']").textContent = "Modificar";
    }
    function ocultarModal() {
        formulario.reset()
        modal.style.display = "none";
    }

    /* boton_mostrar.addEventListener("click", mostrarModal); */
    mostrarModal();
    boton_x.addEventListener("click", ocultarModal);
    boton_cancelar.addEventListener("click", ocultarModal);


    formulario.addEventListener("submit", function (event) {
        if(contexto_modal === "modificar") {
            event.preventDefault();
        
            // Obtener los valores actualizados desde el formulario
            let newImage = formulario.querySelector("#imagen").value;
            let newTitle = formulario.querySelector("#titulo").value;
            let newAuthor = formulario.querySelector("#autor").value;
            let newYear = formulario.querySelector("#año").value;
            let newState = formulario.querySelector("#estado").value;
            
            let isTitleValid = validarTexto(newTitle);
            let isAuthorValid = validarTexto(newAuthor);
            let isYearValid = validarAño(newYear);
            let isStateValid = validarEstado(newState);

            if (!isTitleValid) {
                alert('Título inválido. Debe tener entre 3 y 30 letras y no tener caracteres especiales.');
            } 
            else if (!isAuthorValid) {
                alert('Autor inválido. Debe contener entre 3 y 25 letras y no tener caracteres especiales.');
            } 
            else if (!isYearValid) {
                alert('Año inválido. Debe estar en el rango de -1000 a 2023.');
            } 
            else if (!isStateValid) {
                alert('Estado inválido. Debe ser "disponible" o "prestado".');
            } else {
                if (libro.imagen && libro.imagen.startsWith('img/')) {
                    libro.titulo = newTitle;
                    libro.autor = newAuthor;
                    libro.año = newYear;
                    libro.estado = newState;
                    console.log("Objeto actualizado con imagen original", libro);
                    ocultarModal();
                    contenedorTarjetas.dispatchEvent(tarjetaActualizadaEvent);
                    console.log('Evento Disparado')
                } else {
                    // Si el objeto no tiene una imagen que comience con 'img/',
                    let validar_imagen = new Image();
                    validar_imagen.src = newImage;
        
                    validar_imagen.onload = function () {
                        libro.imagen = newImage;
                        libro.titulo = newTitle;
                        libro.autor = newAuthor;
                        libro.año = newYear;
                        libro.estado = newState;
                        console.log("Objeto actualizado correctamente", libro);
                        ocultarModal();
                        contenedorTarjetas.dispatchEvent(tarjetaActualizadaEvent);
                        console.log('Evento Disparado')
                    };
        
                    validar_imagen.onerror = function () {
                        collect_image = 'img/ops.png';
                        libro.imagen = newImage;
                        libro.titulo = newTitle;
                        libro.autor = newAuthor;
                        libro.año = newYear;
                        libro.estado = newState;
                        console.log("Objeto actualizado (con respaldo)", libro);
                        ocultarModal();
                        contenedorTarjetas.dispatchEvent(tarjetaActualizadaEvent);
                        console.log('Evento Disparado')
                    };
                }
            }
            console.log(lista_libros)
/*             contenedorTarjetas.innerHTML = '';
            lista_libros.forEach(libro => crearLibro(libro)); */
        }
    });
}

function validarTexto(texto) {
    let caracteres = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ!? _\-0-9]+$/;
    if (caracteres.test(texto) && texto.length >= 3 && texto.length <= 30) {
        return true;
    } else {
        return false;
    }
}
function validarAño(numero) {
    let añoIngresado = parseInt(numero)
    if (añoIngresado >= -1000 && añoIngresado <= 2023) {
        return true;
    } else {
        return false;
    }
}
function validarEstado(texto) {
    let estado = texto.toLowerCase().trim() 
    return ["disponible", "prestado"].includes(estado) ? true : false;
}
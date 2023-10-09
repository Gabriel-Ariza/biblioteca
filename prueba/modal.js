import { añadirLibroLista, lista_libros } from "./maicol.js";
import { contexto_modal } from "./crear.js";



export function inicializarModal(boton_llamado) {
    let modal = document.getElementById("modal");
    let boton_mostrar = boton_llamado//document.getElementById("llamarModal");
    let boton_x = document.getElementById("boton_x");
    let boton_cancelar = document.getElementById("cancelarModal");
    const formulario = document.getElementById("formulario_libro");


    function mostrarModal() {
        formulario.reset()
        document.getElementById("encabezado").textContent = "Crea Tu Nuevo Libro";
        formulario.querySelector("button[type='submit']").textContent = "Guardar Libro";
        modal.style.display = "flex";
    }
    function ocultarModal() {
        formulario.reset()
        modal.style.display = "none";
    }

   /*  boton_mostrar.addEventListener("click", mostrarModal); */
    mostrarModal();
    // Ocultar modal al hacer clic en el botón de cerrar
    boton_x.addEventListener("click", ocultarModal);
    boton_cancelar.addEventListener("click", ocultarModal);

    formulario.addEventListener("submit", function (event) {
        if(contexto_modal === 'crear') {
            event.preventDefault();
            let collect_image = document.getElementById("imagen").value;
            let collect_title = document.getElementById("titulo").value;
            let collect_author = document.getElementById("autor").value;
            let collect_year = document.getElementById("año").value;
            let collect_state = document.getElementById("estado").value.toLowerCase().trim();
    
            if (libroRepetido(collect_title)) {
                alert('El título ya existe en la lista de libros. Elige otro título.');
                return;
            }
    
            let isTitleValid = validarTexto(collect_title);
            let isAuthorValid = validarTexto(collect_author);
            let isYearValid = validarAño(collect_year);
            let isStateValid = validarEstado(collect_state);
    
            if (!isTitleValid) {
                alert('Título inválido. Debe tener entre 3 y 30 letras y no tener caracteres especiales.');
            } 
            if (!isAuthorValid) {
                alert('Autor inválido. Debe contener entre 3 y 25 letras y no tener caracteres especiales.');
            } 
            else if (!isYearValid) {
                alert('Año inválido. Debe estar en el rango de -1000 a 2023.');
            } 
            else if (!isStateValid) {
                alert('Estado inválido. Debe ser "disponible" o "prestado".');
            } else {
                if (collect_image.trim() === "") {
                    collect_image = 'img/icon.webp';
                }
                let datosModal = {
                    imagen: collect_image,
                    titulo: collect_title,
                    autor: collect_author,
                    año: collect_year,
                    estado: collect_state
                };
                console.log("Objeto creado:", datosModal);
                añadirLibroLista(datosModal);
                ocultarModal();
            }
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


function libroRepetido(titulo) {
    let tituloMinuscula = titulo.toLowerCase();
    return lista_libros.some(libro => libro.titulo.toLowerCase() === tituloMinuscula);
}
